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

export const getSegmentsCount = createSelector(
  [getSegments],
  (segments) => {
    const { data } = segments || {};
    if (!data || !Array.isArray(data)) {
      return 0;
    }
    return data.length;
  },
);
export const getSegmentsData = createSelector(
  [getSegments],
  (segments) => {
    const { data } = segments || {};
    if (!data || !Array.isArray(data)) {
      return [];
    }
    const entityTypes = {
      PHONE: 'phones',
      EMAIL: 'emails',
    };
    return data.map((d) => {
      const { entityTypesTotal } = d || {};
      if (entityTypesTotal && Array.isArray(entityTypesTotal)) {
        const { phones, emails } = entityTypesTotal
          .reduce((acc, { entityType, total }) => {
            if (!entityType) {
              return acc;
            }
            return ({
              ...acc,
              [entityTypes[entityType] || entityType]: total,
            });
          }, {});
        return ({ ...d, phones, emails });
      }
      return d;
    });
  },
);
export const getSegmentsMeta = createSelector(
  [getSegments],
  (segments) => segments.meta || {},
);
