import { createReducer } from '@reduxjs/toolkit';

import {
  list,
  listError,
  roles,
  rolesError,
  userDetails,
  userDetailsError,
} from './actions';

const initialState = {
  list: [],
  listError: '',
  roles: [],
  rolesError: '',
  userDetails: {},
  userDetailsError: '',
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
  [roles]: (state, action) => ({
    ...state,
    roles: action.payload,
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
});

export default reducer;
