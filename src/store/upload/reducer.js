import { createReducer } from '@reduxjs/toolkit';

import {
  stage,
} from './actions';

const initialState = {
  stage: '',
};

const reducer = createReducer(initialState, {
  [stage]: (state, action) => ({
    ...state,
    stage: action.payload,
  }),
});

export default reducer;
