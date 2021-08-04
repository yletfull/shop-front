import { createSelector } from '@reduxjs/toolkit';
import {
  entityTypes,
  namespace as NS,
} from '@/features/Audiences/constants';

export const getAudiencesList = (state) => (
  state[NS]?.audiencesList || []);
export const getAudiencesMeta = (state) => (
  state[NS]?.audiencesMeta || {});
export const getIsFetchingAudiencesList = (state) => (
  state[NS]?.isFetchingAudiencesList);

export const getFormattedAudienceList = createSelector(
  [getAudiencesList],
  (list) => {
    const mapEntityTotals = (entities) => {
      if (!entities || !Array.isArray(entities)) {
        return ([]);
      }
      return entities.reduce((acc, { entityType, total }) => {
        const mapEntities = {
          [entityTypes.emails]: 'emals',
          [entityTypes.phones]: 'phones',
        };
        if (!entityType) {
          return acc;
        }
        return ({
          ...acc,
          [mapEntities[entityType] || entityType]: total,
        });
      }, {});
    };

    return list
      .map((item) => ({
        key: `${item.title}-${item.loadedAt}`,
        ...item,
        ...mapEntityTotals(item.entityTypeTotals),
      }));
  },
);
export const getAudiencesPagination = createSelector(
  [getAudiencesMeta],
  (meta) => meta?.pagination || {},
);
