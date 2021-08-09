import { createSelector } from '@reduxjs/toolkit';
import NS from './namespace';

export const getIsChecked = (state) => (
  state[NS]?.isChecked || false);
export const getIsFetching = (state) => (
  state[NS]?.isFetching || false);
export const getError = (state) => (
  state[NS]?.error || null);
export const getUser = (state) => (
  state[NS]?.user || null);

export const getIsAuthorized = createSelector(
  [getUser],
  (user) => user && Object.keys(user).length > 0,
);

export const getAbilities = createSelector(
  [getUser],
  (user) => user?.abilities?.data || [],
);
export const getHasUnlimitedAccess = createSelector(
  [getAbilities],
  (abilities) => abilities.map(({ name }) => name).includes('*'),
);
export const getAbilitiesBySection = createSelector(
  [getAbilities],
  (abilities) => abilities
    .reduce((acc, cur) => {
      const { id, name } = cur || {};
      if (!name || !id) {
        return acc;
      }
      const [section, action] = name.split('.');
      if (!section) {
        return acc;
      }
      return ({
        ...acc,
        [section]: {
          ...acc[section] || {},
          [action || 'view']: cur,
        },
      });
    }, {}),
);
