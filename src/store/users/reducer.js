import { createReducer } from '@reduxjs/toolkit';

import {
  list,
  listError,
} from './actions';

const initialState = {
  list: [],
  listError: '',
};

const reducer = createReducer(initialState, {
  [list]: (state, action) => ({
    ...state,
    list: action.payload,
  }),
  [listError]: (state, action) => ({
    ...state,
    listError: action.payload,
  }),
});

export default reducer;
