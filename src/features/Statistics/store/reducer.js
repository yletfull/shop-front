import { createReducer } from '@reduxjs/toolkit';
import {
  entitiesRequest,
  entitiesData,
  entitiesError,
} from './actions';
import NS from './ns';

const initialState = {
  entities: {
    isFetching: false,
    tree: [],
    error: null,
  },
};

const reducer = createReducer(initialState, {
  [entitiesRequest]: (state) => ({
    ...state,
    entities: {
      isFetching: true,
      tree: [],
      error: null,
    },
  }),
  [entitiesData]: (state, action) => ({
    ...state,
    entities: {
      isFetching: false,
      tree: Array.isArray(action.payload) ? action.payload : [],
      error: null,
    },
  }),
  [entitiesError]: (state, action) => ({
    ...state,
    entities: {
      isFetching: false,
      tree: [],
      error: action.payload,
    },
  }),
});

reducer.NS = NS;

export default reducer;
