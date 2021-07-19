// import { createSelector } from '@reduxjs/toolkit';
import { namespace as NS } from './constants';

export const getIsFetchingEntities = (state) => (
  state[NS]?.isFetchingEntities || false);
export const getEntities = (state) => (
  state[NS]?.entities || []);
