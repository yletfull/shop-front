import { createReducer } from '@reduxjs/toolkit';

import {
  createUserError,
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
  editRoleError,
  createRoleError,
} from './actions';

const initialState = {
  createUserError: '',
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
  editRoleError: '',
  createRoleError: '',
};

const reducer = createReducer(initialState, {
  [createUserError]: (state, action) => ({
    ...state,
    createUserError: action.payload,
  }),
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
  [editRoleError]: (state, action) => ({
    ...state,
    editRoleError: action.payload,
  }),
  [createRoleError]: (state, action) => ({
    ...state,
    createRoleError: action.payload,
  }),
});

export default reducer;
