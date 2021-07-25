import { createAction } from '@reduxjs/toolkit';
import {
  initialStatisticEntities,
  attributeProps,
  equalities,
  equalityTypes,
  namespace as NS,
  segmentProps,
} from './constants';
import {
  getSegmentAttributes,
} from './selectors';
import {
  formatSegmentAttributesListForRequest,
  formatStatisticEntities,
  getRandomString,
} from './helpers';
import service from './service';

export const requestParams = createAction(`${NS}/params/request`);
export const updateParams = createAction(`${NS}/params/update`);

export const requestSegment = createAction(`${NS}/segment/request`);
export const updateSegment = createAction(`${NS}/segment/update`);
export const resetSegment = createAction(`${NS}/segment/reset`);

export const updateStatistics = createAction(`${NS}/segment/statistics`);

export const submitSegment = createAction(`${NS}/segment/submit`);

export const fetchParams = () => async (dispatch) => {
  dispatch(requestParams());
  try {
    const { groups } = await service.fetchParams();
    dispatch(updateParams(groups));
  } catch (error) {
    console.error(error);
    dispatch(updateParams([]));
  }
};

export const updateSegmentAttribute = (position, values) => (
  (dispatch, getState) => {
    const attributes = getSegmentAttributes(getState());
    const [groupIndex, attributeIndex] = position;
    const attribute = attributes[groupIndex][attributeIndex];
    if (!attribute) {
      return;
    }
    dispatch(updateSegment({
      [segmentProps.attributes]: [
        ...attributes.slice(0, groupIndex),
        [
          ...attributes[groupIndex].slice(0, attributeIndex),
          {
            ...attribute,
            ...values,
          },
          ...attributes[groupIndex].slice(attributeIndex + 1),
        ],
        ...attributes.slice(groupIndex + 1),
      ],
    }));
  });

export const requestSegmentStatistics = () => (dispatch) => {
  dispatch(updateStatistics({
    segment: {
      ...initialStatisticEntities,
      isFetching: true,
    },
  }));
};
export const updateSegmentStatistics = (values) => (dispatch) => {
  const { emails, error, phones } = values || {};
  if (typeof emails === 'undefined' && typeof phones === 'undefined') {
    return;
  }
  const segment = { emails, error, phones, isFetching: false };
  dispatch(updateStatistics({ segment }));
};

export const fetchSegmentStatistics = (segment) => async (dispatch) => {
  const { title, attributes } = segment || {};
  if (!attributes
    || !Array.isArray(attributes)
    || attributes.length === 0) {
    dispatch(updateSegmentStatistics(initialStatisticEntities));
    return;
  }
  dispatch(requestSegmentStatistics());
  try {
    const response = await service.fetchSegmentStatistics({
      title: title || 'temporary',
      conditions: formatSegmentAttributesListForRequest(attributes),
    });
    dispatch(updateSegmentStatistics(formatStatisticEntities(response)));
  } catch (error) {
    const { response } = error || {};
    if (response) {
      dispatch(updateSegmentStatistics({
        ...initialStatisticEntities,
        error: response,
      }));
    }
    console.error(error);
  }
};

export const moveCondition = ({ source, target }) => (dispatch, getState) => {
  const [sourceGroup, sourceIndex] = source;
  const [targetGroup, targetIndex] = target;
  const state = getState();

  // move condition
  const conditionsGroups = getSegmentAttributes(state);
  const condition = conditionsGroups[sourceGroup][sourceIndex];
  const updatedGroups = conditionsGroups.map((group, groupIndex) => {
    if (groupIndex === sourceGroup) {
      // remove condition from its source group
      return [
        ...group.slice(0, sourceIndex),
        null,
        ...group.slice(sourceIndex + 1),
      ];
    }

    return group;
  });
  const movedGroups = targetIndex === -1
    // insert new group at index
    ? ([
      ...updatedGroups.slice(0, targetGroup),
      [condition],
      ...updatedGroups.slice(targetGroup),
    ])
    // merge condition into existing group
    : updatedGroups.map((group, groupIndex) => {
      if (groupIndex === targetGroup) {
        return [
          ...group.slice(0, targetIndex),
          condition,
          ...group.slice(targetIndex),
        ];
      }

      return group;
    });
  const filteredGroups = movedGroups
    .map((group) => group.filter(Boolean))
    .filter((group) => group.length > 0);

  // commit changes
  dispatch(updateSegment({
    [segmentProps.attributes]: filteredGroups,
  }));
};

export const addSegmentAttribute = (attributes) => (dispatch, getState) => {
  const conditions = getSegmentAttributes(getState());
  const createGroupWithCondition = (attribute) => ([
    {
      ...attribute,
      equality: (Array.isArray(attribute.options) && attribute.options.length)
        ? equalities.in
        : equalities.eq,
      negation: false,
      values: [],
      datasetIds: [],
      clientId: getRandomString(),
    },
  ]);
  const newConditions = attributes.map(createGroupWithCondition);
  dispatch(updateSegment({
    conditions: [
      ...conditions,
      ...newConditions,
    ],
  }));
};

export const removeSegmentAttribute = (position) => (dispatch, getState) => {
  const [sourceGroup, sourceIndex] = position;
  const state = getState();

  const conditionsGroups = getSegmentAttributes(state);
  const filteredConditions = conditionsGroups
    .map((group, groupIndex) => (
      group.filter((_, index) => (
        !(groupIndex === sourceGroup && index === sourceIndex)
      ))
    ))
    .filter((group) => group.length > 0);

  dispatch(updateSegment({
    [segmentProps.attributes]: filteredConditions,
  }));
};

export const saveSegment = (segment, callback) => async (dispatch) => {
  const { attributes, id, title } = segment || {};
  if (!title
    || !attributes
    || !Array.isArray(attributes)
    || attributes.length === 0) {
    return;
  }
  const formattedAttributes = formatSegmentAttributesListForRequest(attributes);
  dispatch(submitSegment(true));
  try {
    const response = await service.saveSegment({
      [segmentProps.id]: id,
      [segmentProps.name]: title,
      [segmentProps.attributes]: formattedAttributes,
    });
    dispatch(submitSegment(false));
    if (response.status === 201 && typeof callback === 'function') {
      callback();
    }
  } catch (error) {
    dispatch(submitSegment(false));
    console.error(error);
  }
};

export const fetchSegment = (id) => async (dispatch) => {
  dispatch(requestSegment());
  try {
    const response = await service.fetchSegment(id);
    const {
      [segmentProps.attributes]: segmentAttributes,
      [segmentProps.id]: segmentId,
      [segmentProps.name]: segmentName,
    } = response || {};
    const mapAttributes = ({
      attribute,
      type: attributeEquality,
      [attributeProps.datasetIds]: attributeDatasetIds,
      [attributeProps.values]: attributeValues,
      [attributeProps.negation]: attributeNegation,
    }) => ({
      ...attribute,
      [attributeProps.datasetIds]: attributeDatasetIds || [],
      [attributeProps.values]: attributeValues || [],
      [attributeProps.negation]: attributeNegation || false,
      [attributeProps.equality]: attributeEquality || equalityTypes.any,
      clientId: getRandomString(),
    });
    const mapAttributesGroup = (group) => group.map(mapAttributes);
    dispatch(updateSegment({
      [segmentProps.id]: segmentId,
      [segmentProps.name]: segmentName || '',
      [segmentProps.attributes]: segmentAttributes
        .map(mapAttributesGroup),
    }));
  } catch (error) {
    console.error(error);
    dispatch(updateSegment({}));
  }
};
