import { createAction } from '@reduxjs/toolkit';
import NS from './namespace';
import service from './service';

export const authLogin = createAction(`${NS}/login`);
export const authLogout = createAction(`${NS}/logout`);

export const test = createAction('test');
export const setTest = (value) => async (dispatch) => {
  dispatch(test(value));
};

export const authCheck = () => async (dispatch) => {
  try {
    const user = await service.check();
    dispatch(authLogin(user));
  } catch (error) {
    console.error(error);
    dispatch(authLogout());
  }
};

export const authSignIn = ({
  method,
  callback,
  ...payload
} = {}) => async (dispatch) => {
  const user = await service.login(payload);

  dispatch(authLogin(user.data));
};

export const authSignOut = () => async (dispatch) => {
  await service.logout();

  dispatch(authLogout());
};
