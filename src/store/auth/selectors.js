import { createSelector } from '@reduxjs/toolkit';
import NS from './namespace';

export const getAuthIsChecked = (state) => state[NS].isChecked;

export const getAuthUser = (state) => state[NS].user;

export const getAuthIsAuthorized = createSelector(
  [getAuthUser],
  Boolean,
);
