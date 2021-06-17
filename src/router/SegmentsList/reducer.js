import { createReducer } from '@reduxjs/toolkit';
import {
  requestData,
  updateData,
  updateMeta,
} from './actions';

const initialState = {
  isFetching: false,
  data: [],
  meta: {},
};

export default createReducer(initialState, {
  [requestData]: (state) => ({
    ...state,
    isFetching: true,
  }),
  [updateData]: (state, action) => ({
    ...state,
    isFetching: false,
    data: action.payload || [],
  }),
  [updateMeta]: (state, action) => ({
    ...state,
    meta: action.payload || {},
  }),
});
