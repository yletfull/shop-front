import { createSelector } from '@reduxjs/toolkit';
import { namespace as NS, segmentProps } from './constants';

export const getIsFetchingParams = (state) => (
  state[NS]?.isFetchingParams || false);
export const getIsFetchingSegment = (state) => (
  state[NS]?.isFetchingSegment || false);
export const getParams = (state) => (
  state[NS]?.params || []);
export const getSegment = (state) => (
  state[NS]?.segment || {});

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
