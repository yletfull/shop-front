import { createReducer } from '@reduxjs/toolkit';
import {
  requestParams,
  updateParams,
} from './actions';

const initialState = {
  isFetchingParams: false,
  params: [],
};

export default createReducer(initialState, {
  [requestParams]: (state) => ({
    ...state,
    isFetchingParams: true,
  }),
  [updateParams]: (state, action) => ({
    ...state,
    isFetchingParams: false,
    params: action.payload || [],
  }),
});
