import { createSelector } from '@reduxjs/toolkit';
import { namespace as NS } from './constants';

export const getIsFetchingAttributes = (state) => (
  state[NS]?.isFetchingAttributes);
export const getIsFetchingSegments = (state) => (
  state[NS]?.isFetchingSegments);
export const getAttributes = (state) => (
  state[NS]?.attributes);
export const getSegments = (state) => (
  state[NS]?.segments);
