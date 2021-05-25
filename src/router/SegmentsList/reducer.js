import { createReducer } from '@reduxjs/toolkit';
import { requestData, updateData } from './actions';

const initialState = {
  isFetching: false,
  data: [],
};

export default createReducer(initialState, {
  [requestData]: (state) => ({
    ...state,
    isFetching: true,
  }),
  [updateData]: (state, action) => ({
    ...state,
    isFetching: false,
    data: action.payload || [],
  }),
});
