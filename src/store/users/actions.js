import { createAction } from '@reduxjs/toolkit';
import NS from './namespace';
import service from './service';

export const list = createAction(`${NS}/list`);
export const listError = createAction(`${NS}/listError`);

export const allRoles = createAction(`${NS}/allRoles`);
export const userRoles = createAction(`${NS}/userRoles`);
export const rolesError = createAction(`${NS}/rolesError`);

export const userDetails = createAction(`${NS}/userDetails`);
export const userDetailsError = createAction(`${NS}/userDetailsError`);
export const userSetRoleError = createAction(`${NS}/userSetRoleError`);
export const createUserError = createAction(`${NS}/createUserError`);


export const rolesDetails = createAction(`${NS}/rolesDetails`);
export const rolesDetailsError = createAction(`${NS}/rolesDetailsError`);
export const rolesAbilities = createAction(`${NS}/rolesAbilities`);
export const allRoleAbilities = createAction(`${NS}/allRoleAbilities`);
export const allRoleAbilitiesError = createAction(`${NS}/allRoleAbilitiesError`);
export const editRoleError = createAction(`${NS}/editRoleError`);
export const createRoleError = createAction(`${NS}/createRoleError`);

export const fetchUsers = (params) => async (dispatch) => {
  try {
    const data = await service.getUsers(params);
    dispatch(list(data.data.data));
  } catch (err) {
    dispatch(list([]));
    dispatch(listError(err));
  }
};

export const createUser = (params) => async (dispatch) => {
  try {
    await service.createUser(params);
    dispatch(createUserError(''));
    dispatch(fetchUsers());
  } catch (err) {
    dispatch(createUserError(err));
  }
};

export const fetchAllRoles = (params) => async (dispatch) => {
  try {
    const data = await service.getAllRoles(params);
    dispatch(allRoles(data.data.data));
  } catch (err) {
    dispatch(allRoles([]));
    dispatch(rolesError(err));
  }
};

export const fetchUserDetails = ({ userId }) => async (dispatch) => {
  try {
    const data = await service.getUserDetails({ userId });
    dispatch(userDetails(data.data.data));
  } catch (err) {
    dispatch(userDetails({}));
    dispatch(userDetailsError(err));
  }
};

export const fetchUserRoles = ({ userId }) => async (dispatch) => {
  try {
    const data = await service.getUserRoles({ userId });
    dispatch(userRoles(data.data.data));
  } catch (err) {
    dispatch(userRoles({}));
    dispatch(userDetailsError(err));
  }
};

export const setUserRoles = ({ userId, ...params }) => async (dispatch) => {
  try {
    await service.setUserRoles({ userId, ...params });
  } catch (err) {
    dispatch(userDetailsError(err));
  }
};

export const removeUserRole = ({ userId, roleName }) => async (dispatch) => {
  try {
    await service.removeUserRole({ userId, roleName });
  } catch (err) {
    dispatch(userDetailsError(err));
  }
};

export const fetchRolesDetails = ({ roleName }) => async (dispatch) => {
  try {
    const data = await service.getRolesDetails({ roleName });
    dispatch(rolesDetails(data.data.data));
  } catch (err) {
    dispatch(rolesDetails({}));
    dispatch(userSetRoleError(err));
  }
};

export const fetchRolesAbilities = ({ roleName }) => async (dispatch) => {
  try {
    const data = await service.getRoleAbilities({ roleName });
    dispatch(rolesAbilities(data.data.data));
  } catch (err) {
    dispatch(rolesAbilities({}));
    dispatch(userSetRoleError(err));
  }
};

export const fetchAllRoleAbilities = () => async (dispatch) => {
  try {
    const data = await service.getAllRoleAbilities();
    dispatch(allRoleAbilities(data.data.data));
  } catch (err) {
    dispatch(allRoleAbilities({}));
    dispatch(allRoleAbilitiesError(err));
  }
};

export const editRole = (
  { roleName, ...params }
) => async (dispatch) => {
  try {
    await service.editRole({ roleName, ...params });
  } catch (err) {
    dispatch(editRoleError(err));
  }
};

export const createRole = (params) => async (dispatch) => {
  try {
    await service.createRole(params);
    dispatch(createRoleError(''));
    dispatch(fetchAllRoles());
  } catch (err) {
    dispatch(createRoleError(err));
  }
};
