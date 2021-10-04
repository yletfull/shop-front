import { createReducer } from '@reduxjs/toolkit';
import {
  entitiesRequest,
  entitiesData,
  entitiesError,
  entityTypeData,
} from './actions';
import NS from './ns';

const initialState = {
  entityType: null,
  entitiesIsFetching: false,
  entities: [],
  entitiesError: null,
};

const reducer = createReducer(initialState, {
  [entitiesRequest]: (state, action) => ({
    ...state,
    entitiesIsFetching: action.payload,
  }),
  [entitiesData]: (state, action) => ({
    ...state,
    entities: Array.isArray(action.payload) ? action.payload : [],
  }),
  [entitiesError]: (state, action) => ({
    ...state,
    entitiesError: action.payload,
  }),
  [entityTypeData]: (state, action) => ({
    ...state,
    entityType: action.payload,
  }),
});

reducer.NS = NS;

export default reducer;
