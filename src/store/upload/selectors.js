import { createSelector } from '@reduxjs/toolkit';
import NS from './namespace';

export const getState = (state) => state[NS] || {};

export const getAccounts = createSelector(
  [getState],
  (state) => state.accounts,
);
export const getClients = createSelector(
  [getState],
  (state) => state.clients,
);
export const getSelectAccount = createSelector(
  [getState],
  (state) => state.selectAccount,
);
export const getSelectClient = createSelector(
  [getState],
  (state) => state.selectClient,
);
export const getQueueList = createSelector(
  [getState],
  (state) => state.queueList,
);
export const getRecentFile = createSelector(
  [getState],
  (state) => state.recentFile,
);
export const getRecentFileIsLoading = createSelector(
  [getState],
  (state) => state.recentFileIsLoading,
);
export const getDocumentDetails = createSelector(
  [getState],
  (state) => state.documentDetails,
);
export const getUploadedFiles = createSelector(
  [getState],
  (state) => state.uploadedFiles,
);
export const getDocuments = createSelector(
  [getState],
  (state) => state.documents,
);
export const getStage = createSelector(
  [getState],
  (state) => state.stage,
);
export const getSyncVkTask = createSelector(
  [getState],
  (state) => state.syncVkTask,
);
export const getSelectedList = createSelector(
  [getState],
  (state) => state.selectedList,
);
export const getParentDocument = createSelector(
  [getState],
  (state) => state.parentDocument,
);
export const getImages = createSelector(
  [getState],
  (state) => state.images,
);
export const getUploadedImages = createSelector(
  [getState],
  (state) => state.uploadedImages,
);
