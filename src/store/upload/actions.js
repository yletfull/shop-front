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
export const sheet = createAction(`${NS}/sheet`);
export const task = createAction(`${NS}/task`);

export const setStage = (value) => (dispatch) => {
  dispatch(stage(value));
};

export const fetchAccounts = () => async (dispatch) => {
  try {
    const data = await service.fetchAccountsList();
    dispatch(accounts(data.data.data));
  } catch (err) {
    dispatch(accounts([]));
    console.log(err);
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
    console.log(err);
  }
};

export const setClient = (clientId) => (dispatch) => {
  dispatch(selectClient(clientId));
};

export const fetchQueueList = () => async (dispatch, getState) => {
  try {
    const cabinetId = getState().upload.selectAccount;
    const clientId = getState().upload.selectClient;
    const data = await service.fetchClientsList({ cabinetId, clientId });
    dispatch(queueList(data.data.data));
  } catch (err) {
    dispatch(queueList([]));
    console.log(err);
  }
};

export const fetchDocuments = () => async (dispatch) => {
  try {
    const data = await service.fetchDocuments();
    dispatch(documents(data.data.data));
  } catch (err) {
    dispatch(documents([]));
    console.log(err);
  }
};

export const fetchDocumentDetails = (documentId) => async (dispatch) => {
  try {
    const data = await service.fetchDocumentDetails({ documentId });
    dispatch(documentDetails(data.data.data));
  } catch (err) {
    dispatch(documentDetails([]));
    console.log(err);
  }
};

export const uploadFiles = (files) => async (dispatch) => {
  try {
    const data = await service.uploadFiles({ files });
    dispatch(uploadedFiles, data);
  } catch (err) {
    dispatch(documentDetails([]));
    console.log(err);
  }
};

export const setSheet = (data) => (dispatch) => {
  dispatch(sheet(data));
};

export const acceptFile = () => async (dispatch, getState) => {
  try {
    const data = await service.acceptFile({
      documentId: getState().upload.documentDetails.id,
      cabinetId: getState().upload.selectAccount,
      clientId: getState().upload.selectClient,
      sheetNum: getState().upload.sheet,
    });
    dispatch(task(data));
  } catch (err) {
    console.log(err);
  }
};
