import { createSelector } from '@reduxjs/toolkit';
import { namespace as NS } from './constants';

export const getState = (state) => state[NS] || {};
export const getIsFetchingParams = createSelector(
  [getState],
  (state) => state.isFetchingParams,
);
export const getIsFetchingSegment = createSelector(
  [getState],
  (state) => state.isFetchingSegment,
);
export const getParams = createSelector(
  [getState],
  (state) => state.params,
);
export const getSegment = createSelector(
  [getState],
  (state) => {
    const { segment } = state;
    if (segment && Array.isArray(segment)) {
      return segment;
    }
    return [];
  },
);
