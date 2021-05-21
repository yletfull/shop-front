import { createReducer } from '@reduxjs/toolkit';

import {
  users,
  usersError,
} from './actions';

const initialState = {
  users: [],
  usersError: '',
};

const reducer = createReducer(initialState, {
  [users]: (state, action) => ({
    ...state,
    stage: action.payload,
  }),
  [usersError]: (state, action) => ({
    ...state,
    stage: action.payload,
  }),
});

export default reducer;
