import { createReducer } from '@reduxjs/toolkit';
import {
  requestEntities,
  requestPeriods,
  updateEntities,
  updatePeriods,
} from './actions';

const initialState = {
  isFetchingEntities: false,
  isFetchingPeriods: false,
  entities: [],
  periods: [],
  reactionsComments: {
    data: {},
    meta: {},
  },
};

export default createReducer(initialState, {
  [requestEntities]: (state) => ({
    ...state,
    isFetchingEntities: true,
  }),
  [requestPeriods]: (state) => ({
    ...state,
    isFetchingPeriods: true,
  }),
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
