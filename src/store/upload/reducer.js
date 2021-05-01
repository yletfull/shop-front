import { createReducer } from '@reduxjs/toolkit';
import { firstUploadStages } from '@/router/Upload/stages';

import {
  stage,
  accounts,
  selectAccount,
  clients,
  selectClient,
  queueList,
  documents,
  documentDetails,
} from './actions';

const initialState = {
  stage: firstUploadStages.filseIsNotLoaded,
};

const reducer = createReducer(initialState, {
  [stage]: (state, action) => ({
    ...state,
    stage: action.payload,
  }),
  [accounts]: (state, action) => ({
    ...state,
    accounts: action.payload,
  }),
  [selectAccount]: (state, action) => ({
    ...state,
    selectAccount: action.payload,
  }),
  [clients]: (state, action) => ({
    ...state,
    clients: action.payload,
  }),
  [selectClient]: (state, action) => ({
    ...state,
    selectClient: action.payload,
  }),
  [queueList]: (state, action) => ({
    ...state,
    queueList: action.payload,
  }),
  [documents]: (state, action) => ({
    ...state,
    documents: action.payload,
  }),
  [documentDetails]: (state, action) => ({
    ...state,
    documentDetails: action.payload,
  }),
});

export default reducer;
