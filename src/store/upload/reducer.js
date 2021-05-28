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
  uploadedFiles,
  task,
  selectedList,
  recentFile,
  images,
  uploadImageError,
  parentDocument,
} from './actions';

const initialState = {
  stage: firstUploadStages.selectAccount,
  accounts: [],
  selectAccount: '',
  clients: [],
  selectClient: '',
  queueList: [],
  documents: [],
  documentDetails: {},
  uploadedFiles: [
    {
      id: 'f03ab169-92ed-4d5f-9c13-ab898c0f0dbf',
      objectId: 'f03ab169-92ed-4d5f-9c13-ab898c0f0dbf',
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      createdAt: '2021-05-04T13:49:52.816262Z',
      fileName: 'template_vk_cabinet1900013172_client_1606750579.xlsx',
      title: 'template_vk_cabinet1900013172_client_1606750579.xlsx',
      sequenceId: 0,
      childrenCount: 0,
      siblingsCount: 0,
      isParentDoc: true,
      data: {
        sheets: [
          '57578275-96fc-4525-a632-05b4fa00842d',
        ],
      },
      selectedList: '',
    },
  ],
  task: {},
  recentFile: {},
  images: [],
  uploadImageError: '',
  parentDocument: {},
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
  [uploadedFiles]: (state, action) => ({
    ...state,
    uploadedFiles: action.payload,
  }),
  [task]: (state, action) => ({
    ...state,
    task: action.payload,
  }),
  [selectedList]: (state, action) => ({
    ...state,
    selectedList: action.payload,
  }),
  [recentFile]: (state, action) => ({
    ...state,
    recentFile: action.payload,
  }),
  [images]: (state, action) => ({
    ...state,
    images: action.payload,
  }),
  [uploadImageError]: (state, action) => ({
    ...state,
    uploadImageError: action.payload,
  }),
  [parentDocument]: (state, action) => ({
    ...state,
    parentDocument: action.payload,
  }),
});

export default reducer;
