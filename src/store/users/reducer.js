import { createReducer } from '@reduxjs/toolkit';

import {
  list,
  listError,
  roles,
  rolesError,
} from './actions';

const initialState = {
  list: [],
  listError: '',
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
});

export default reducer;
