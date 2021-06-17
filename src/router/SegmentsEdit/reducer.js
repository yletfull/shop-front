import { createReducer } from '@reduxjs/toolkit';
import { segmentProps } from './constants';
import {
  requestParams,
  requestSegment,
  resetSegment,
  updateParams,
  updateSegment,
} from './actions';

const initialSegment = {
  [segmentProps.id]: null,
  [segmentProps.name]: '',
  [segmentProps.attributes]: [],
};

const initialState = {
  isFetchingParams: false,
  isFetchingSegment: false,
  params: [],
  segment: initialSegment,
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
    segment: {
      ...state.segment,
      ...action.payload || {},
    },
  }),
  [resetSegment]: (state) => ({
    ...state,
    segment: initialSegment,
  }),
});
