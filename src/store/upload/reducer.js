import { createReducer } from '@reduxjs/toolkit';
import { firstUploadStages } from '@/router/Upload/stages';

import {
  stage,
} from './actions';

const initialState = {
  stage: firstUploadStages.filseIsNotLoaded,
};

const reducer = createReducer(initialState, {
  [stage]: (state, action) => ({
    ...state,
    stage: action.payload,
  }),
});

export default reducer;
