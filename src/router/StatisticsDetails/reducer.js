import { createReducer } from '@reduxjs/toolkit';
import {
  requestDictionary,
  updateDictinary,
} from './actions';

const initialState = {
  isFetchingDictinary: false,
  dictionary: [],
};

export default createReducer(initialState, {
  [requestDictionary]: (state) => ({
    ...state,
    isFetching: true,
  }),
  [updateDictinary]: (state, action) => ({
    ...state,
    isFetchingDictinary: false,
    dictionary: action?.payload || [],
  }),
});
