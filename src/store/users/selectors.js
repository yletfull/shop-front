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
export const getCreateRoleError = createSelector(
  [getState],
  (state) => state.createRoleError,
);
export const getAllRoles = createSelector(
  [getState],
  (state) => state.allRoles,
);

export const getUsersList = createSelector(
  [getState],
  (state) => state.list,
);
export const getCreateUserError = createSelector(
  [getState],
  (state) => state.createUserError,
);
export const getUserDetails = createSelector(
  [getState],
  (state) => state.userDetails,
);
export const getUserRoles = createSelector(
  [getState],
  (state) => state.userRoles,
);
export const getUserSetRoleError = createSelector(
  [getState],
  (state) => state.userSetRoleError,
);
