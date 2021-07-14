import { createReducer } from '@reduxjs/toolkit';
import {
  requestAudienceDetails,
  updateAudienceDetails,
} from './actions';

const initialState = {
  isFetchingAudienceDetails: false,
  audienceDetails: {},
};

export default createReducer(initialState, {
  [requestAudienceDetails]: (state) => ({
    ...state,
    isFetchingAudienceDetails: true,
  }),
  [updateAudienceDetails]: (state, action) => ({
    ...state,
    isFetchingAudienceDetails: false,
    audienceDetails: action.payload || {},
  }),
});
