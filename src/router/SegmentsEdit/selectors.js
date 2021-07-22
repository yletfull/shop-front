import { createSelector } from '@reduxjs/toolkit';
import { namespace as NS, segmentProps } from './constants';

export const getIsFetchingParams = (state) => (
  state[NS]?.isFetchingParams || false);
export const getIsFetchingSegment = (state) => (
  state[NS]?.isFetchingSegment || false);
export const getIsSubmittingSegment = (state) => (
  state[NS]?.isSubmittingSegment || false);
export const getParams = (state) => (
  state[NS]?.params || []);
export const getSegment = (state) => (
  state[NS]?.segment || {});
export const getStatistics = (state) => (
  state[NS]?.statistics || {});

export const getSegmentId = createSelector(
  [getSegment],
  (segment) => segment.id || null,
);
export const getSegmentName = createSelector(
  [getSegment],
  (segment) => segment[segmentProps.name] || '',
);
export const getSegmentAttributes = createSelector(
  [getSegment],
  (segment) => {
    const { [segmentProps.attributes]: attributes } = segment;
    if (attributes && Array.isArray(attributes)) {
      return attributes;
    }
    return [];
  },
);
export const getSegmentStatistics = createSelector(
  [getStatistics],
  (statistics) => statistics.segment || {},
);
export const getAttributesStatistics = createSelector(
  [getStatistics],
  (statistics) => statistics.attributes || [],
);
export const getMapProfileTitle = createSelector(
  [getParams],
  (attributes) => attributes.reduce((acc, group) => {
    try {
      const [{ profileId }] = group.attributes;

      return {
        ...acc,
        [profileId]: group.group,
      };
    } catch (error) {
      console.error(error);
      return acc;
    }
  }, {}),
);
export const getMapAttribute = createSelector(
  [getParams],
  (attributes) => attributes.reduce((result, group) => ({
    ...result,
    ...group.attributes.reduce((acc, attribute) => ({
      ...acc,
      [attribute.id]: attribute,
    }), {}),
  }), {}),
);
