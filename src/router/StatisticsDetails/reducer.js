import { createReducer } from '@reduxjs/toolkit';
import {
  requestDynamics,
  requestEntities,
  updateDynamics,
  updateEntities,
} from './actions';

const initialState = {
  isFetchingDynamics: false,
  isFetchingEntities: false,
  dynamics: {
    data: {},
    meta: {},
  },
  entities: [],
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
});
