import { createReducer } from '@reduxjs/toolkit';
import {
  equalities,
} from '../constants';
import {
  getRandomString,
  checkHasOptions,
} from '../utils';
import {
  attributesRequest,
  attributesData,
  attributesError,
  appendConditions,
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
  [appendConditions]: (state, action) => {
    if (!Array.isArray(action.payload) || action.payload.length < 1) {
      return state;
    }

    const newConditions = action.payload.map((attribute) => ([
      {
        ...attribute,
        equality: checkHasOptions(attribute.options)
          ? equalities.in
          : equalities.eq,
        negation: false,
        values: [],
        datasetIds: [],
        clientId: getRandomString(),
      },
    ]));

    return {
      ...state,
      conditions: [
        ...state.conditions,
        ...newConditions,
      ],
    };
  },
  [conditionsChange]: (state, action) => ({
    ...state,
    conditions: action.payload || [],
  }),
});

reducer.NS = NS;

export default reducer;
