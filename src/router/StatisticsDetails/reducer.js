import { createReducer } from '@reduxjs/toolkit';
import {
  requestDynamics,
  requestEntities,
  requestPeriods,
  updateDynamics,
  updateEntities,
  updatePeriods,
} from './actions';

const initialState = {
  isFetchingDynamics: false,
  isFetchingEntities: false,
  isFetchingPeriods: false,
  dynamics: {
    data: {},
    meta: {},
  },
  entities: [],
  periods: [],
  reactionsComments: {
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
  [requestPeriods]: (state) => ({
    ...state,
    isFetchingPeriods: true,
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
  [updatePeriods]: (state, action) => ({
    ...state,
    periods: action?.payload || [],
    isFetchingPeriods: false,
  }),
});
