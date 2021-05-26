import { createSelector } from '@reduxjs/toolkit';
import { namespace as NS } from './constants';

export const getState = (state) => state[NS] || {};
export const getIsFetchingParams = createSelector(
  [getState],
  (state) => state.isFetchingParams,
);
export const getParams = createSelector(
  [getState],
  (state) => state.params,
);
