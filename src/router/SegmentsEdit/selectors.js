import { createSelector } from '@reduxjs/toolkit';
import { namespace as NS, segmentProps } from './constants';

export const getState = (state) => state[NS] || {};
export const getIsFetchingParams = createSelector(
  [getState],
  (state) => state.isFetchingParams || false,
);
export const getIsFetchingSegment = createSelector(
  [getState],
  (state) => state.isFetchingSegment || false,
);
export const getParams = createSelector(
  [getState],
  (state) => state.params || [],
);
export const getSegment = createSelector(
  [getState],
  (state) => state.segment || {},
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
