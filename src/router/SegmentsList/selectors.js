import { createSelector } from '@reduxjs/toolkit';
import { namespace as NS } from './constants';

export const getData = (state) => state[NS]?.data || [];
export const getMeta = (state) => state[NS]?.meta || {};
export const getIsFetchingData = (state) => state[NS]?.isFetching || false;

export const getPagination = createSelector(
  [getMeta],
  (meta) => meta.pagination || {},
);
