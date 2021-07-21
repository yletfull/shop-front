import { createReducer } from '@reduxjs/toolkit';
import {
  requestDynamics,
  requestEntities,
  requestReactionsTonality,
  updateDynamics,
  updateEntities,
  updateReactionsTonality,
} from './actions';

const initialState = {
  isFetchingDynamics: false,
  isFetchingEntities: false,
  isFetchingReactionsTonality: false,
  dynamics: {
    data: {},
    meta: {},
  },
  entities: [],
  reactionsTonality: {
    data: {},
    meta: {},
  },
};

export default createReducer(initialState, {
  [requestDynamics]: (state) => ({
    ...state,
    isFetchingDynamics: true,
  }),
  [requestEntities]: (state) => ({
    ...state,
    isFetchingEntities: true,
  }),
  [requestReactionsTonality]: (state) => ({
    ...state,
    isFetchingReactionsTonality: true,
  }),
  [updateDynamics]: (state, action) => {
    const { data, meta } = action?.payload || {};
    return ({
      ...state,
      dynamics: {
        data: data || {},
        meta: meta || {},
      },
      isFetchingDynamics: false,
    });
  },
  [updateEntities]: (state, action) => ({
    ...state,
    entities: action?.payload || [],
    isFetchingEntities: false,
  }),
  [updateReactionsTonality]: (state, action) => {
    const { data, meta } = action?.payload || {};
    return ({
      ...state,
      reactionsTonality: {
        data: data || {},
        meta: meta || {},
      },
      isFetchingReactionsTonality: false,
    });
  },
});
