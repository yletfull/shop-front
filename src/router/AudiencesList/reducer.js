import { createReducer } from '@reduxjs/toolkit';
import {
  requestAudiencesList,
  updateAudiencesList,
} from './actions';

const initialState = {
  isFetchingAudiencesList: false,
  audiencesList: [],
  audiencesMeta: {},
};

export default createReducer(initialState, {
  [requestAudiencesList]: (state) => ({
    ...state,
    isFetchingAudiencesList: true,
  }),
  [updateAudiencesList]: (state, action) => {
    const { data, meta } = action?.payload || {};
    return ({
      ...state,
      isFetchingAudiencesList: false,
      audiencesList: data || [],
      audiencesMeta: meta || {},
    });
  },
});
