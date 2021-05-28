import { createSelector } from '@reduxjs/toolkit';
import { namespace as NS } from './constants';

export const getState = (state) => state[NS] || {};
export const getIsFetchingData = createSelector(
  [getState],
  (state) => state.isFetching,
);
export const getData = createSelector(
  [getState],
  (state) => state.data,
);
