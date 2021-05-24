import { createAction } from '@reduxjs/toolkit';
import NS from './namespace';
import service from './service';

export const list = createAction(`${NS}/list`);
export const listError = createAction(`${NS}/listError`);
export const roles = createAction(`${NS}/roles`);
export const rolesError = createAction(`${NS}/rolesError`);

export const fetchUsers = (params) => async (dispatch) => {
  try {
    const data = await service.getUsers(params);
    dispatch(list(data.data.data));
  } catch (err) {
    dispatch(list([]));
    dispatch(listError(err));
  }
};

export const fetchRoles = (params) => async (dispatch) => {
  try {
    const data = await service.getRoles(params);
    dispatch(roles(data.data.data));
  } catch (err) {
    dispatch(roles([]));
    dispatch(rolesError(err));
  }
};
