import { createReducer } from '@reduxjs/toolkit';
import {
  requestParams,
  requestSegment,
  updateParams,
  updateSegment,
} from './actions';

const initialState = {
  isFetchingParams: false,
  isFetchingSegment: false,
  params: [],
  segment: [],
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
  [requestSegment]: (state) => ({
    ...state,
    isFetchingSegment: true,
  }),
  [updateSegment]: (state, action) => ({
    ...state,
    isFetchingSegment: false,
    segment: action.payload || [],
  }),
});
