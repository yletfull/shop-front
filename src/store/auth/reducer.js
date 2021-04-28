import { createReducer } from '@reduxjs/toolkit';

import {
  authLogin,
  authLogout,
  authError,
} from './actions';

const initialState = {
  isChecked: false,
  user: null,
  error: null,
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
});

export default reducer;
