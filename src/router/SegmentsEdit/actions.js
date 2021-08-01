import { createAction } from '@reduxjs/toolkit';
import {
  initialStatisticEntities,
  attributeProps,
  equalityTypes,
  namespace as NS,
  segmentProps,
} from '@/features/Segments/constants';
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
