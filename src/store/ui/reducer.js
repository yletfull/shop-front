import { createReducer } from '@reduxjs/toolkit';
import { setHeader } from './actions';

const initialState = {
  header: '',
};

export default createReducer(initialState, {
  [setHeader]: (state, action) => ({
    ...state,
    header: action.payload || '',
  }),
});
