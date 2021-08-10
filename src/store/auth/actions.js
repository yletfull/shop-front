import { createAction } from '@reduxjs/toolkit';
import NS from './namespace';
import service from './service';

export const authLogin = createAction(`${NS}/login`);
export const authLogout = createAction(`${NS}/logout`);
export const authError = createAction(`${NS}/setError`);
export const isFetching = createAction(`${NS}/isFetching`);

export const setIsFetching = (value) => (dispatch) => {
  dispatch(isFetching(value));
};

export const authCheck = () => async (dispatch) => {
  dispatch(setIsFetching(true));
  try {
    const user = await service.check();
    dispatch(authLogin(user));
    dispatch(setIsFetching(false));
  } catch (error) {
    console.error(error);
    dispatch(authLogout());
    dispatch(setIsFetching(false));
  }
};

export const authSignIn = ({
  method,
  callback,
  ...payload
} = {}) => async (dispatch) => {
  dispatch(setIsFetching(true));
  try {
    const user = await service.login(payload);
    dispatch(authLogin(user));
    dispatch(setIsFetching(false));
  } catch (err) {
    dispatch(authError('Ошибка авторизации'));
    dispatch(setIsFetching(false));
  }
};

export const authSignOut = () => async (dispatch) => {
  await service.logout();
  dispatch(authLogout());
};
