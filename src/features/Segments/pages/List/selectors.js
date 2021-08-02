import { createSelector } from '@reduxjs/toolkit';
import {
  namespace as NS,
  segmentEntityTypes,
} from './constants';

export const getData = (state) => state[NS]?.data || [];
export const getMeta = (state) => state[NS]?.meta || {};
export const getIsFetchingData = (state) => state[NS]?.isFetching || false;

export const getPagination = createSelector(
  [getMeta],
  (meta) => meta.pagination || {},
);

export const getTableData = createSelector(
  [getData],
  (data) => {
    const mapTableData = (d) => {
      let totalEmailsCount = 0;
      let totalPhonesCount = 0;

      const { entityTypesTotal } = d || {};

      if (entityTypesTotal && Array.isArray(entityTypesTotal)) {
        entityTypesTotal.forEach(({ entityType, total }) => {
          switch (entityType) {
            case segmentEntityTypes.emails:
              totalEmailsCount = total;
              break;
            case segmentEntityTypes.phones:
              totalPhonesCount = total;
              break;
            default:
              break;
          }
        });
      }

      return ({
        ...d,
        totalEmailsCount,
        totalPhonesCount,
      });
    };
    return data.map(mapTableData);
  },
);
