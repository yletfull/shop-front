import { createSelector } from '@reduxjs/toolkit';
import { namespace as NS } from './constants';

export const getIsFetchingDynamics = (state) => (
  state[NS]?.isFetchingDynamics || false);
export const getIsFetchingEntities = (state) => (
  state[NS]?.isFetchingEntities || false);
export const getDynamics = (state) => (
  state[NS]?.dynamics || {});
export const getEntities = (state) => (
  state[NS]?.entities || []);

export const getEntityDynamicsData = createSelector(
  [getDynamics],
  (dynamics) => {
    const { data } = dynamics || {};
    return data || {};
  },
);
export const getEntityDynamicsMeta = createSelector(
  [getDynamics],
  (dynamics) => {
    const { data, meta } = dynamics || {};
    let maxValue = 0;
    if (!meta?.maxValue && data) {
      maxValue = Math.max(...Object.values(data)
        .map((values) => Math.max(...Object.keys(values)
          .map((key) => (key === 'date' ? 0 : Number(values[key]))))));
    }
    return ({
      maxValue,
    });
  },
);
