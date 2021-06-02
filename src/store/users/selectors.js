import { createSelector } from '@reduxjs/toolkit';
import NS from './namespace';

export const getState = (state) => state[NS] || {};


export const getAllRoleAbilities = createSelector(
  [getState],
  (state) => state.allRoleAbilities,
);
export const getAllRoleAbilitiesError = createSelector(
  [getState],
  (state) => state.allRoleAbilitiesError,
);

export const getEditRoleError = createSelector(
  [getState],
  (state) => state.editRoleError,
);

export const getRolesAbilities = createSelector(
  [getState],
  (state) => state.rolesAbilities,
);

export const getRolesDetails = createSelector(
  [getState],
  (state) => state.rolesDetails,
);
