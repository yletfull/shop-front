import api from '@/api';
import { apiBaseUrl } from './constants';

export const createUser = function serviceCreateUser(data) {
  return api
    .post(`${apiBaseUrl}/users`, { data })
    .then((response) => response.data);
};

export const fetchRoles = function serviceFetchRoles() {
  return api
    .get(`${apiBaseUrl}/rbac/roles`)
    .then((response) => response.data.data);
};

export const fetchUser = function serviceFetchUser(id) {
  if (!id) {
    return;
  }
  return api
    .get(`${apiBaseUrl}/user/${encodeURIComponent(id)}`)
    .then((response) => response.data.data);
};

export const fetchUserRolesList = function serviceFetchUserRolesList(id) {
  if (!id) {
    return;
  }
  return api
    .get(`${apiBaseUrl}/user/${encodeURIComponent(id)}/roles`)
    .then((response) => response.data.data);
};

export const fetchUsersList = function serviceFetchUsersList(params) {
  return api
    .get(`${apiBaseUrl}/users`, { params })
    .then((response) => response.data);
};

export const removeUser = function serviceRemoveUser(id) {
  if (!id) {
    return;
  }
  return api
    .delete(`${apiBaseUrl}/user/${encodeURIComponent(id)}`)
    .then((response) => response.data);
};

export const updateUser = function serviceUpdateUser({ id, data }) {
  if (!id) {
    return;
  }
  return api
    .patch(`${apiBaseUrl}/user/${encodeURIComponent(id)}`, { data });
};

export const updateUserRoles = function serviceUpdateUserRoles({ id, data }) {
  if (!id) {
    return;
  }
  return api
    .patch(`${apiBaseUrl}/user/${encodeURIComponent(id)}/roles`, { ...data });
};

export default {
  createUser,
  fetchRoles,
  fetchUser,
  fetchUserRolesList,
  fetchUsersList,
  removeUser,
  updateUser,
  updateUserRoles,
};