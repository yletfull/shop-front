import { createSelector } from '@reduxjs/toolkit';
import {
  mapEntityTypes,
  namespace as NS,
} from './constants';

export const getIsFetchingAudienceCompare = (state) => (
  state[NS]?.isFetchingAudienceCompare);
export const getIsFetchingAudienceDetails = (state) => (
  state[NS]?.isFetchingAudienceDetails);
export const getAudienceCompare = (state) => (
  state[NS]?.audienceCompare || {});
export const getAudienceDetails = (state) => (
  state[NS]?.audienceDetails || {});

export const getFormattedAudienceCompare = createSelector(
  [getAudienceCompare],
  (compare) => Object.keys(compare)
    .map((key) => compare[key]
      .map((d) => {
        const result = [];
        const { comparedEntityTypes, name, total } = d || {};

        if (total && Object.keys(total).length > 0) {
          result.push({
            name,
            key: `${key}-total`,
            isTotal: true,
            ...total,
          });
        }

        if (comparedEntityTypes && Array.isArray(comparedEntityTypes)) {
          result.push(comparedEntityTypes
            .map((entity) => {
              const { entityType, value } = entity || {};
              return ({
                key: `${key}-${entityType}`,
                isTotal: false,
                name: mapEntityTypes[entityType] || '',
                ...value,
              });
            }));
        }

        return result
          .reduce((acc, cur) => {
            if (Array.isArray(cur)) {
              return ([...acc, ...cur]);
            }
            return ([...acc, cur]);
          }, []);
      })
      .reduce((acc, cur) => ([...acc, ...cur]), []))
    .reduce((acc, cur) => ([...acc, ...cur]), []),
);
