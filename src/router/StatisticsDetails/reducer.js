import { createReducer } from '@reduxjs/toolkit';
import {
  requestEntities,
  updateEntities,
} from './actions';

const initialState = {
  isFetchingEntities: false,
  entities: [],
};

export default createReducer(initialState, {
  [requestEntities]: (state) => ({
    ...state,
    isFetchingEntities: true,
  }),
  [updateEntities]: (state, action) => ({
    ...state,
    isFetchingEntities: false,
    entities: action?.payload || [],
  }),
});
