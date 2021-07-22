import { createSelector } from '@reduxjs/toolkit';
import { namespace as NS } from './constants';

export const getIsFetchingAttributes = (state) => (
  state[NS]?.isFetchingAttributes || false);
export const getIsFetchingSegments = (state) => (
  state[NS]?.isFetchingSegments || false);
export const getAttributes = (state) => (
  state[NS]?.attributes || {});
export const getSegments = (state) => (
  state[NS]?.segments || {});

export const getAttributesData = createSelector(
  [getAttributes],
  (attributes) => attributes?.data || [],
);
