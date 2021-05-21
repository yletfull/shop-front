import { createAction } from '@reduxjs/toolkit';
import NS from './namespace';
import service from './service';

export const users = createAction(`${NS}/users`);
export const usersError = createAction(`${NS}/usersError`);

export const fetchUsers = (params) => async (dispatch) => {
  try {
    const data = await service.getUsers(params);
    dispatch(users(data));
  } catch (err) {
    dispatch(users([]));
    dispatch(usersError(err));
  }
};
