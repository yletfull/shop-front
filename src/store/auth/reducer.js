import { createReducer } from '@reduxjs/toolkit';

import {
  authLogin,
  authLogout,
  authError,
  isFetching,

  isFetchingAbilities,
  updateAbilities,
} from './actions';

const initialState = {
  isChecked: false,
  user: null,
  error: null,
  isFetching: false,

  abilities: [],
  isFetchingAbilities: false,
};

const reducer = createReducer(initialState, {
  [authLogin]: (state, action) => ({
    ...state,
    isChecked: true,
    user: action.payload || {},
  }),
  [authLogout]: (state) => ({
    ...state,
    isChecked: true,
    user: null,
  }),
  [authError]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  [isFetching]: (state, action) => ({
    ...state,
    isFetching: action.payload,
  }),

  [isFetchingAbilities]: (state) => ({
    ...state,
    isFetchingAbilities: true,
  }),
  [updateAbilities]: (state, action) => ({
    ...state,
    abilities: action.payload || [],
    isFetchingAbilities: false,
  }),
});

export default reducer;
