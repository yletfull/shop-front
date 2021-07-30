import { createSelector } from '@reduxjs/toolkit';
import NS from './namespace';

export const getIsChecked = (state) => (
  state[NS]?.isChecked || false);
export const getIsFetching = (state) => (
  state[NS]?.isFetching || false);
export const getError = (state) => (
  state[NS]?.error || null);
export const getUser = (state) => (
  state[NS]?.user || null);

export const getIsFetchingAbilities = (state) => (
  state[NS]?.isFetchingAbilities || false);
export const getAbilities = (state) => (
  state[NS]?.abilities || []);

export const getIsAuthorized = createSelector(
  [getUser],
  (user) => user && Object.keys(user).length > 0,
);
