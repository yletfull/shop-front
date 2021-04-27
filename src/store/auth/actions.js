import { createAction } from '@reduxjs/toolkit';
import NS from './namespace';
import service from './service';

export const authLogin = createAction(`${NS}/login`);
export const authLogout = createAction(`${NS}/logout`);

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
  if (method === 'oauth') {
    service.launchOauth(() => {
      if (typeof callback === 'function') {
        callback();
      }
    });
    return;
  }

  const user = await service.login(payload);

  dispatch(authLogin(user));
};

export const authSignOut = () => async (dispatch) => {
  await service.logout();

  dispatch(authLogout());
};
