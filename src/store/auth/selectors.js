import { createSelector } from '@reduxjs/toolkit';
import NS from './namespace';

export const getState = (state) => state[NS] || {};
export const getIsChecked = createSelector(
  [getState],
  (state) => state.isChecked,
);
export const getIsFetching = createSelector(
  [getState],
  (state) => state.isFetching,
);
export const getUser = createSelector(
  [getState],
  (state) => state.user,
);
export const getError = createSelector(
  [getState],
  (state) => state.error,
);
export const getIsAuthorized = createSelector(
  [getUser],
  (user) => user && Object.keys(user).length > 0,
);
