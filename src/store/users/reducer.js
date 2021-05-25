import { createReducer } from '@reduxjs/toolkit';

import {
  list,
  listError,
  allRoles,
  rolesError,
  userDetails,
  userDetailsError,
  userRoles,
  rolesDetails,
  rolesDetailsError,
  userSetRoleError,
  rolesAbilities,
  allRoleAbilities,
  allRoleAbilitiesError,
} from './actions';

const initialState = {
  list: [],
  listError: '',
  roles: [],
  rolesError: '',
  userDetails: {},
  userDetailsError: '',
  userRoles: {},
  rolesDetails: {},
  rolesDetailsError: '',
  userSetRoleError: '',
  rolesAbilities: '',
  allRoleAbilities: [],
  allRoleAbilitiesError: '',
};

const reducer = createReducer(initialState, {
  [list]: (state, action) => ({
    ...state,
    list: action.payload,
  }),
  [listError]: (state, action) => ({
    ...state,
    listError: action.payload,
  }),
  [allRoles]: (state, action) => ({
    ...state,
    allRoles: action.payload,
  }),
  [rolesError]: (state, action) => ({
    ...state,
    rolesEror: action.payload,
  }),
  [userDetails]: (state, action) => ({
    ...state,
    userDetails: action.payload,
  }),
  [userDetailsError]: (state, action) => ({
    ...state,
    userDetailsError: action.payload,
  }),
  [userRoles]: (state, action) => ({
    ...state,
    userRoles: action.payload,
  }),
  [rolesDetails]: (state, action) => ({
    ...state,
    rolesDetails: action.payload,
  }),
  [rolesDetailsError]: (state, action) => ({
    ...state,
    rolesDetailsError: action.payload,
  }),
  [userSetRoleError]: (state, action) => ({
    ...state,
    rolesDetailsError: action.payload,
  }),
  [rolesAbilities]: (state, action) => ({
    ...state,
    rolesAbilities: action.payload,
  }),
  [allRoleAbilities]: (state, action) => ({
    ...state,
    allRoleAbilities: action.payload,
  }),
  [allRoleAbilitiesError]: (state, action) => ({
    ...state,
    allRoleAbilitiesError: action.payload,
  }),
});

export default reducer;
