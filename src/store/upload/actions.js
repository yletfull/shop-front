import { createAction } from '@reduxjs/toolkit';
import NS from './namespace';
import service from './service';

export const stage = createAction(`${NS}/setStage`);
export const accounts = createAction(`${NS}/accounts`);
export const selectAccount = createAction(`${NS}/selectAccount`);
export const clients = createAction(`${NS}/clients`);
export const selectClient = createAction(`${NS}/selectClient`);
export const queueList = createAction(`${NS}/queueList`);
export const documents = createAction(`${NS}/documents`);
export const documentDetails = createAction(`${NS}/documentDetails`);
export const uploadedFiles = createAction(`${NS}/uploadedFiles`);
export const selectedList = createAction(`${NS}/selectedList`);
export const task = createAction(`${NS}/task`);
export const recentFile = createAction(`${NS}/recentFile`);
export const recentFileIsLoading = createAction(`${NS}/recentFileIsLoading`);
export const images = createAction(`${NS}/images`);
export const uploadImageError = createAction(`${NS}/uploadImageError`);
export const parentDocument = createAction(`${NS}/parentDocument`);
export const uploadedImages = createAction(`${NS}/uploadedImages`);
export const importedDocument = createAction(`${NS}/importedDocument`);

export const setStage = (value) => (dispatch) => {
  dispatch(stage(value));
};

export const fetchAccounts = () => async (dispatch) => {
  try {
    const data = await service.fetchAccountsList();
    const accountsList = data.data.data.filter(
      (acc) => acc.data.account_type === 'agency'
    );
    dispatch(accounts(accountsList));
  } catch (err) {
    dispatch(accounts([]));
  }
};

export const setAccount = (cabinetId) => (dispatch) => {
  dispatch(selectAccount(cabinetId));
};

export const fetchClients = () => async (dispatch, getState) => {
  try {
    const cabinetId = getState().upload.selectAccount;
    const data = await service.fetchClientsList({ cabinetId });
    dispatch(clients(data.data.data));
  } catch (err) {
    dispatch(clients([]));
  }
};

export const setClient = (clientId) => (dispatch) => {
  dispatch(selectClient(clientId));
};

export const fetchQueueList = (params) => async (dispatch, getState) => {
  try {
    const cabinetId = getState().upload.selectAccount;
    const clientId = getState().upload.selectClient;
    const data = await service
      .fetchQueueList({ cabinetId, clientId, params });
    dispatch(queueList(data.data.data));
  } catch (err) {
    dispatch(queueList([]));
  }
};

export const fetchDocuments = (params) => async (dispatch) => {
  try {
    const data = await service.fetchDocuments(params);
    dispatch(documents(data.data.data));
  } catch (err) {
    dispatch(documents([]));
  }
};

export const fetchDocumentDetails = (documentId) => async (dispatch) => {
  try {
    const data = await service.fetchDocumentDetails({ documentId });
    dispatch(documentDetails(data.data.data));
  } catch (err) {
    dispatch(documentDetails([]));
  }
};

export const setUploadedFiles = (files) => async (dispatch) => {
  dispatch(uploadedFiles(files));
};

export const uploadFiles = (files) => async (dispatch) => {
  try {
    const data = await service.uploadFiles({ files });
    dispatch(uploadedFiles(data.data.data));
  } catch (err) {
    dispatch(uploadFiles([]));
  }
};

export const uploadImages = ({ formData }) => async (dispatch, getState) => {
  try {
    await service.uploadImages({
      documentId: getState().upload.documentDetails.id,
      formData,
    });
  } catch (err) {
    dispatch(uploadImageError(err));
  }
};

export const setSelectedList = (data) => (dispatch) => {
  dispatch(selectedList(data));
};

export const importDocument = () => async (dispatch, getState) => {
  try {
    const data = await service.importDocument({
      documentId: getState().upload.parentDocument.id,
      cabinetId: getState().upload.selectAccount,
      clientId: getState().upload.selectClient,
      sheetNum: getState().upload.selectedList,
    });
    dispatch(importedDocument(data.data.data));
    return data.data.data;
  } catch (err) {
    dispatch(importedDocument([]));
  }
};

export const fetchTask = (taskId) => async (dispatch) => {
  try {
    const data = await service.getTask({ taskId });
    dispatch(task(data.data.data));
    return data.data.data;
  } catch (err) {
    dispatch(task([]));
  }
};

export const fetchRecentFile = () => async (dispatch, getState) => {
  try {
    const data = await service.getRecentFile({
      cabinetId: getState().upload.selectAccount,
      clientId: getState().upload.selectClient,
    });
    dispatch(recentFile(data.data.data));
  } catch (err) {
    dispatch(recentFile([]));
  }
};

export const setRecentFileIsLoading = (value) => (dispatch) => {
  dispatch(recentFileIsLoading(value));
};

export const setParentDocument = (value) => (dispatch) => {
  dispatch(parentDocument(value));
};

export const fetchImages = ({ documentId }) => async (dispatch, getState) => {
  try {
    const data = await service.getImages({
      documentId,
      sheetNum: getState().upload.selectedList,
    });
    dispatch(images(data.data.meta.images));
  } catch (err) {
    dispatch(images([]));
  }
};

export const setUploadedImages = (data) => (dispatch) => {
  dispatch(uploadedImages(data));
};
