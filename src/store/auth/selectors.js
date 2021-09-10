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

export const getPermissions = createSelector(
  [getUser],
  (user) => user?.permissions || [],
);
export const getHasUnlimitedAccess = createSelector(
  [getPermissions],
  (permissions) => permissions.includes('*'),
);
export const getPermissionsBySection = createSelector(
  [getPermissions],
  (permissions) => permissions
    .reduce((acc, name) => {
      const [section, action] = name.split('.');
      if (!section) {
        return acc;
      }
      return ({
        ...acc,
        [section]: {
          ...acc[section] || {},
          [action || 'view']: name,
        },
      });
    }, {}),
);
