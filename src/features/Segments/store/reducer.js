import { createReducer } from '@reduxjs/toolkit';
import {
  attributesRequest,
  attributesData,
  attributesError,
  conditionsChange,
  statisticsRequest,
  statisticsData,
  statisticsError,
} from './actions';
import NS from './ns';

const initialState = {
  attributes: {
    isFetching: false,
    tree: [],
    error: null,
  },
  conditions: [],
  statistics: {
    isFetching: false,
    data: [],
    error: null,
  },
};

const reducer = createReducer(initialState, {
  [attributesRequest]: (state) => ({
    ...state,
    attributes: {
      isFetching: true,
      tree: [],
      error: null,
    },
  }),
  [attributesData]: (state, action) => ({
    ...state,
    attributes: {
      isFetching: false,
      tree: Array.isArray(action.payload) ? action.payload : [],
      error: null,
    },
  }),
  [attributesError]: (state, action) => ({
    ...state,
    attributes: {
      isFetching: false,
      tree: [],
      error: action.payload,
    },
  }),
  [conditionsChange]: (state, action) => ({
    ...state,
    conditions: action.payload || [],
  }),
  [statisticsRequest]: (state) => ({
    ...state,
    statistics: {
      ...state.statistics,
      error: null,
      isFetching: true,
    },
  }),
  [statisticsData]: (state, action) => ({
    ...state,
    statistics: {
      ...state.statistics,
      error: null,
      isFetching: false,
      data: Array.isArray(action.payload) ? action.payload : [],
    },
  }),
  [statisticsError]: (state, action) => ({
    ...state,
    statistics: {
      ...state.statistics,
      error: action.payload,
      isFetching: false,
    },
  }),
});

reducer.NS = NS;

export default reducer;
