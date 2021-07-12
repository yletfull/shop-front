import { firstUploadStages } from '@/router/Upload/stages';
import NS from './namespace';

export const getState = (state) => state[NS] || {};

export const getAccounts = (state) => state[NS]?.accounts || [];
export const getClients = (state) => state[NS]?.clients || [];
export const getSelectAccount = (state) => state[NS]?.selectAccount || null;
export const getSelectClient = (state) => state[NS]?.selectClient || null;
export const getQueueList = (state) => state[NS]?.queueList || [];
export const getRecentFile = (state) => state[NS]?.recentFile || {};

export const getRecentFileIsLoading = (state) => state[NS]
  ?.recentFileIsLoading || false;

export const getDocumentDetails = (state) => state[NS]?.documentDetails || {};
export const getUploadedFiles = (state) => state[NS]?.uploadedFiles || {};
export const getDocuments = (state) => state[NS]?.documents || [];

export const getStage = (state) => state[NS]
  ?.stage || firstUploadStages.selectAccount;

export const getSyncVkTask = (state) => (
  state[NS]?.syncVkTask?.command
    ? state[NS]?.syncVkTask
    : { finishedAt: state[NS]?.dashboard?.syncTime }
);
export const getSelectedList = (state) => state[NS]?.selectedList || null;
export const getParentDocument = (state) => state[NS]?.parentDocument || {};
export const getImages = (state) => state[NS]?.images || [];
export const getUploadedImages = (state) => state[NS]?.uploadedImages || [];
