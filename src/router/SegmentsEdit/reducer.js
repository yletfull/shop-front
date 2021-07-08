import { createReducer } from '@reduxjs/toolkit';
import { segmentProps } from './constants';
import {
  requestParams,
  requestSegment,
  resetSegment,
  updateParams,
  updateSegment,
  updateStatistics,
  submitSegment,
} from './actions';

const initialSegment = {
  [segmentProps.id]: null,
  [segmentProps.name]: '',
  [segmentProps.attributes]: [],
};

const initialStatistics = {
  segment: {
    isFetching: false,
    emails: null,
    phones: null,
    error: null,
  },
  attributes: null,
};

const initialState = {
  isFetchingParams: false,
  isFetchingSegment: false,
  isSubmittingSegment: false,
  params: [],
  segment: initialSegment,
  statistics: initialStatistics,
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
  [updateStatistics]: (state, action) => ({
    ...state,
    statistics: {
      ...state.statistics,
      ...action.payload || {},
    },
  }),
  [submitSegment]: (state, action) => ({
    ...state,
    isSubmittingSegment: Boolean(action.payload),
  }),
});
