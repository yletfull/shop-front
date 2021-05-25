import { createSelector } from '@reduxjs/toolkit';
import NS from './namespace';

export const getState = (state) => state[NS] || {};
export const getHeader = createSelector(
  [getState],
  (state) => state.header,
);
