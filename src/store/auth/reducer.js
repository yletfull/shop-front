import { createReducer } from '@reduxjs/toolkit';

import {
  authLogin,
  authLogout,
  test,
} from './actions';

const initialState = {
  isChecked: false,
  user: null,
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
  [test]: (state, action) => ({
    ...state,
    test: action.payload,
  }),
});

export default reducer;
