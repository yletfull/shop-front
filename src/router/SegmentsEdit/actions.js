import { createAction } from '@reduxjs/toolkit';
import {
  initialStatisticEntities,
  attributeProps,
  equalityTypes,
  namespace as NS,
  segmentProps,
} from './constants';
import {
  getAttributesStatistics,
  getSegmentAttributes,
} from './selectors';
import {
  formatSegmentAttributeForRequest,
  formatSegmentAttributesListForRequest,
  formatStatisticEntities,
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
export const addSegmentAttribute = (values) => (dispatch, getState) => {
  const attributes = getSegmentAttributes(getState());
  const mapAttribute = (attr) => {
    const initial = {
      equality: equalityTypes.any,
      negation: false,
      values: [],
      datasetIds: [],
    };
    return ([{ ...initial, ...attr }]);
  };
  dispatch(updateSegment({
    [segmentProps.attributes]: attributes.concat(values.map(mapAttribute)),
  }));
};
export const removeSegmentAttribute = (position) => (dispatch, getState) => {
  const attributes = getSegmentAttributes(getState());
  const [groupIndex, attributeIndex] = position;
  const attribute = attributes[groupIndex];
  if (!attribute) {
    return;
  }
  const newAttribute = [
    ...attribute.slice(0, attributeIndex),
    ...attribute.slice(attributeIndex + 1),
  ];
  dispatch(updateSegment({
    [segmentProps.attributes]: [
      ...attributes.slice(0, groupIndex),
      newAttribute,
      ...attributes.slice(groupIndex + 1),
    ].filter((a) => a.length > 0),
  }));
};
export const moveSegmentAttribute = (source, target) => (
  (dispatch, getState) => {
    const [sourceGroupIndex, sourceAttributeIndex] = source || [];
    const [targetGroupIndex, targetAttributeIndex = 0] = target || [];
    if ([
      sourceGroupIndex,
      targetGroupIndex,
      targetAttributeIndex,
    ].some((index) => typeof index === 'undefined')) {
      return;
    }
    const attributes = getSegmentAttributes(getState());
    dispatch(updateSegment({
      [segmentProps.attributes]: attributes
        .reduce((acc, attrs, index) => {
          if (index === sourceGroupIndex) {
            const newSourceAttributes = [
              ...attrs.slice(0, sourceAttributeIndex),
              ...attrs.slice(sourceAttributeIndex + 1),
            ];
            return [...acc, newSourceAttributes];
          }

          if (index === targetGroupIndex) {
            const newTargetAttributes = [
              ...attrs,
              attributes[sourceGroupIndex][sourceAttributeIndex],
            ];
            return [...acc, newTargetAttributes];
          }

          return [...acc, attrs];
        }, [])
        .filter((attrs) => attrs.length > 0),
    }));
  });
export const insertSegmentAttribute = (position, source) => (
  (dispatch, getState) => {
    const [sourceGroupIndex, sourceAttributeIndex] = source || [];
    if (!position
      || !['top', 'bottom'].includes(position)
      || typeof sourceGroupIndex === 'undefined'
      || typeof sourceAttributeIndex === 'undefined') {
      return;
    }
    const attributes = getSegmentAttributes(getState());
    const sourceAttribute = attributes[sourceGroupIndex][sourceAttributeIndex];
    const newSourceAttributes = [
      ...attributes[sourceGroupIndex].slice(0, sourceAttributeIndex),
      ...attributes[sourceGroupIndex].slice(sourceAttributeIndex + 1),
    ];
    dispatch(updateSegment({
      [segmentProps.attributes]: [
        ...(position === 'top'
          ? [[sourceAttribute]]
          : []),
        ...attributes.slice(0, sourceGroupIndex),
        newSourceAttributes,
        ...attributes.slice(sourceGroupIndex + 1),
        ...(position === 'bottom'
          ? [[sourceAttribute]]
          : []),
      ].filter((attrs) => attrs.length > 0),
    }));
  });
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
export const requestAttributeStatistics = (position) => (
  (dispatch, getState) => {
    if (position.length < 2) {
      return;
    }
    const [groupIndex, attributeIndex] = position || [];
    const attributesStatistics = getAttributesStatistics(getState());
    const attributes = [
      ...attributesStatistics.slice(0, groupIndex),
      [
        ...attributesStatistics[groupIndex].slice(0, attributeIndex),
        {
          isFetching: true,
          emails: null,
          phones: null,
        },
        ...attributesStatistics[groupIndex].slice(attributeIndex + 1),
      ],
      ...attributesStatistics.slice(groupIndex + 1),
    ];
    dispatch(updateStatistics({ attributes }));
  });
export const updateAttributeStatistics = (position, values) => (
  (dispatch, getState) => {
    const { emails = null, phones = null, error = null } = values || {};
    const attributesStatistics = getAttributesStatistics(getState());
    const [groupIndex, attributeIndex] = position;
    const attributes = [
      ...attributesStatistics.slice(0, groupIndex),
      [
        ...attributesStatistics[groupIndex].slice(0, attributeIndex),
        {
          emails,
          error,
          phones,
          isFetching: false,
        },
        ...attributesStatistics[groupIndex].slice(attributeIndex + 1),
      ],
      ...attributesStatistics.slice(groupIndex + 1),
    ];
    dispatch(updateStatistics({ attributes }));
  });

export const clearAttributesStatistics = (attributes) => (dispatch) => {
  if (!Array.isArray(attributes)) {
    return;
  }
  dispatch(updateStatistics({
    attributes: attributes
      .map((andAttribute) => andAttribute
        .map(() => initialStatisticEntities)),
  }));
};

export const fetchAttributesStatistics = (attributes) => (dispatch) => {
  if (!Array.isArray(attributes)) {
    return;
  }
  dispatch(clearAttributesStatistics(attributes));
  return Promise.all(attributes
    .map((andAttribute, andIndex) => Promise.all(andAttribute
      .map(async (orAttribute, orIndex) => {
        const attribute = formatSegmentAttributeForRequest(orAttribute);
        const position = [andIndex, orIndex];
        dispatch(requestAttributeStatistics(position));
        try {
          const response = await service.fetchSegmentStatistics({
            conditions: [[attribute]],
            title: orAttribute.attributeName || orAttribute.id,
          });
          dispatch(updateAttributeStatistics(
            position,
            formatStatisticEntities(response),
          ));
        } catch (error) {
          if (error.response) {
            dispatch(updateAttributeStatistics(
              position,
              { error: error.response },
            ));
          }
          console.error(error);
        }
      }))));
};
export const fetchSegmentStatistics = (segment) => async (dispatch) => {
  const { title, attributes } = segment || {};
  if (!title
    || !attributes
    || !Array.isArray(attributes)
    || attributes.length === 0) {
    dispatch(updateSegmentStatistics(initialStatisticEntities));
    return;
  }
  dispatch(requestSegmentStatistics());
  try {
    const response = await service.fetchSegmentStatistics({
      title,
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
