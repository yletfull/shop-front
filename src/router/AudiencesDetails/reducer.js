import { createReducer } from '@reduxjs/toolkit';
import {
  requestAudienceCompare,
  requestAudienceDetails,
  updateAudienceCompare,
  updateAudienceDetails,
} from './actions';

const initialState = {
  isFetchingAudienceCompare: false,
  isFetchingAudienceDetails: false,
  audienceCompare: {},
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
  [requestAudienceCompare]: (state) => ({
    ...state,
    isFetchingAudienceCompare: true,
  }),
  [updateAudienceCompare]: (state, action) => ({
    ...state,
    isFetchingAudienceCompare: false,
    audienceCompare: action.payload || {},
  }),
});
