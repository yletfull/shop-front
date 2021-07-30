import { createReducer } from '@reduxjs/toolkit';
import {
  attributesRequest,
  attributesData,
  attributesError,
  conditionsChange,
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
});

reducer.NS = NS;

export default reducer;
