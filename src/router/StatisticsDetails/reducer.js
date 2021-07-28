import { createReducer } from '@reduxjs/toolkit';
import {
  requestPeriods,
  updatePeriods,
} from './actions';

const initialState = {
  isFetchingPeriods: false,
  periods: [],
};

export default createReducer(initialState, {
  [requestPeriods]: (state) => ({
    ...state,
    isFetchingPeriods: true,
  }),
  [updatePeriods]: (state, action) => ({
    ...state,
    periods: action?.payload || [],
    isFetchingPeriods: false,
  }),
});
