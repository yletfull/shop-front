import { createAction } from '@reduxjs/toolkit';
import NS from './namespace';
import service from './service';

export const stage = createAction(`${NS}/setStage`);
export const accounts = createAction(`${NS}/accounts`);
export const selectAccount = createAction(`${NS}/selectAccount`);
export const clients = createAction(`${NS}/clients`);
export const selectClient = createAction(`${NS}/selectClient`);

export const setStage = (value) => (dispatch) => {
  dispatch(stage(value));
};

export const fetchAccounts = () => async (dispatch) => {
  try {
    const data = await service.fetchAccountsList();
    dispatch(accounts(data.data.data));
  } catch (err) {
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
    console.log(err);
  }
};


export const setClient = (clientId) => (dispatch) => {
  dispatch(selectClient(clientId));
};
