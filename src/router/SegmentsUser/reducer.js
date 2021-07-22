import { createReducer } from '@reduxjs/toolkit';
import {
  requestAttributes,
  requestSegments,
  updateAttributes,
  updateSegments,
} from './actions';

const initialState = {
  isFetchingAttributes: false,
  isFetchingSegments: false,
  attributes: {
    data: {},
    meta: {},
  },
  segments: {
    data: [],
    meta: {},
  },
};

export default createReducer(initialState, {
  [requestAttributes]: (state) => ({
    ...state,
    isFetchingAttributes: true,
  }),
  [requestSegments]: (state) => ({
    ...state,
    isFetchingSegments: true,
  }),
  [updateAttributes]: (state, action) => {
    const { data, meta } = action?.payload || {};
    return ({
      ...state,
      attributes: {
        data: data || {},
        meta: meta || {},
      },
    });
  },
  [updateSegments]: (state, action) => {
    const { data, meta } = action?.payload || {};
    return ({
      ...state,
      attributes: {
        data: data || {},
        meta: meta || {},
      },
    });
  },
});
