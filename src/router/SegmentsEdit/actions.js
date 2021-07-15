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

export const initAttributesStatistics = () => (dispatch, getState) => {
  const state = getState();
  const statistics = getAttributesStatistics(state);
  const attributes = getSegmentAttributes(state);

  if (!Array.isArray(attributes)) {
    return;
  }

  dispatch(updateStatistics({
    attributes: attributes
      .map((andAttribute, andIndex) => andAttribute
        .map((_, orIndex) => statistics[andIndex]?.[orIndex]
          || initialStatisticEntities)),
  }));
};

export const clearAttributeStatistics = (position) => (dispatch, getState) => {
  const statistics = getAttributesStatistics(getState());

  if (!statistics
    || !position
    || !Array.isArray(position)
    || position.length < 2) {
    return;
  }

  const [groupIndex, attributeIndex] = position;

  dispatch(updateStatistics({
    attributes: statistics
      .map((andStatistics, andIndex) => andStatistics
        .map((orStatistics, orIndex) => {
          if (andIndex === groupIndex && orIndex === attributeIndex) {
            return initialStatisticEntities;
          }
          return orStatistics;
        })),
  }));
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

export const requestAttributeStatistics = (position) => (
  (dispatch, getState) => {
    const statistics = getAttributesStatistics(getState());

    if (!statistics
      || !position
      || !Array.isArray(position)
      || position.length < 2) {
      return;
    }

    const [groupIndex, attributeIndex] = position;

    dispatch(updateStatistics({
      attributes: statistics
        .map((andStatistics, andIndex) => andStatistics
          .map((orStatistics, orIndex) => {
            if (andIndex === groupIndex && orIndex === attributeIndex) {
              return ({
                ...initialStatisticEntities,
                isFetching: true,
              });
            }
            return orStatistics;
          })),
    }));
  });

export const updateAttributeStatistics = (position, values) => (
  (dispatch, getState) => {
    const attributes = getSegmentAttributes(getState());
    const statistics = getAttributesStatistics(getState());

    if (!attributes
      || !statistics
      || !position
      || !Array.isArray(position)
      || position.length < 2) {
      return;
    }

    const [groupIndex, attributeIndex] = position;

    dispatch(updateStatistics({
      attributes: attributes
        .map((andAttribute, andIndex) => andAttribute
          .map((orAttribute, orIndex) => {
            if (andIndex === groupIndex && orIndex === attributeIndex) {
              return ({
                ...initialStatisticEntities,
                ...values,
                isFetching: false,
              });
            }
            return statistics[andIndex]?.[orIndex] || initialStatisticEntities;
          })),
    }));
  });

export const fetchSegmentAttributesStatistics = (value) => (
  async (dispatch, getState) => {
    let attributes = value || [];

    if (!value) {
      attributes = getSegmentAttributes(getState());
    }

    try {
      await Promise.all(attributes
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
    } catch (error) {
      console.error(error);
    }
  });

export const fetchAttributeStatistics = (position) => (
  async (dispatch, getState) => {
    const attributes = getSegmentAttributes(getState());

    if (!position || !Array.isArray(position) || position.length < 2) {
      return;
    }

    dispatch(clearAttributeStatistics(position));
    dispatch(requestAttributeStatistics(position));

    const [groupIndex, attributeIndex] = position;

    const attribute = attributes[groupIndex][attributeIndex];

    if (!attribute) {
      return;
    }

    try {
      const response = await service.fetchSegmentStatistics({
        conditions: [[formatSegmentAttributeForRequest(attribute)]],
        title: attribute.attributeName || attribute.id,
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
  });

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

  // move statistics
  const statisticsGroups = getAttributesStatistics(state);
  const statistics = statisticsGroups[sourceGroup][sourceIndex];
  const updatedStatistics = statisticsGroups.map((group, groupIndex) => {
    if (groupIndex === sourceGroup) {
      return [
        ...group.slice(0, sourceIndex),
        null,
        ...group.slice(sourceIndex + 1),
      ];
    }

    return group;
  });
  const movedStatistics = targetIndex === -1
    // inser new statistics group at index
    ? ([
      ...updatedStatistics.slice(0, targetGroup),
      [statistics],
      ...updatedStatistics.slice(targetGroup),
    ])
    // merge statistics into existing group
    : updatedStatistics.map((group, groupIndex) => {
      if (groupIndex === targetGroup) {
        return [
          ...group.slice(0, targetIndex),
          statistics,
          ...group.slice(targetIndex),
        ];
      }

      return group;
    });
  const filteredStatistics = movedStatistics
    .map((group) => group.filter(Boolean))
    .filter((group) => group.length > 0);

  // commit changes
  dispatch(updateSegment({
    [segmentProps.attributes]: filteredGroups,
  }));
  dispatch(updateStatistics({
    attributes: filteredStatistics,
  }));
};

export const addSegmentAttribute = (values) => (dispatch, getState) => {
  const attributes = getSegmentAttributes(getState());
  const mapAttribute = (attr) => {
    const initial = {
      equality: equalityTypes.any,
      negation: false,
      values: [],
      datasetIds: [],
      fakeId: getRandomString(),
    };
    return ([{ ...initial, ...attr }]);
  };
  const newAttributes = values.map(mapAttribute);
  dispatch(updateSegment({
    [segmentProps.attributes]: attributes.concat(newAttributes),
  }));
  dispatch(initAttributesStatistics());
  newAttributes.forEach((_, index) => {
    dispatch(fetchAttributeStatistics([attributes.length + index, 0]));
  });
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

  const statisticsGroups = getAttributesStatistics(state);
  const filteredStatistics = statisticsGroups
    .map((group, groupIndex) => (
      group.filter((_, index) => (
        !(groupIndex === sourceGroup && index === sourceIndex)
      ))
    ))
    .filter((group) => group.length > 0);

  dispatch(updateSegment({
    [segmentProps.attributes]: filteredConditions,
  }));
  dispatch(updateStatistics({
    attributes: filteredStatistics,
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
      fakeId: getRandomString(),
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
  dispatch(initAttributesStatistics());
  dispatch(fetchSegmentAttributesStatistics());
};
