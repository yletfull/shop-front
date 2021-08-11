import api from '@/api';
import { apiBaseUrl } from './constants';

const fetchPermissions = function serviceFetchPermissions(params) {
  return api
    .get(`${apiBaseUrl}/abilities`, { params })
    .then((response) => response.data);
};

const fetchRole = function serviceFetchRole({ name, params }) {
  if (!name) {
    return;
  }
  return api
    .get(`${apiBaseUrl}/role/${encodeURIComponent(name)}`, { params })
    .then((response) => response.data);
};

const fetchRolePermissions = function serviceFetchRolePermissions({
  name,
  params,
}) {
  if (!name) {
    return;
  }
  return api
    .get(`${apiBaseUrl}/role/${encodeURIComponent(name)}/abilities`, { params })
    .then((response) => response.data);
};

const fetchRolesList = function serviceFetchRolesList(params) {
  return api
    .get(`${apiBaseUrl}/roles`, { params })
    .then((response) => response.data);
};

const removeRole = function serviceRemoveRole(name) {
  if (!name) {
    return;
  }
  return api
    .delete(`${apiBaseUrl}/role/${encodeURIComponent(name)}`);
};

const updateRole = function serviceUpdateRole({ name, title, permissions }) {
  if (!name) {
    return;
  }
  return api
    .patch(`${apiBaseUrl}/role/${encodeURIComponent(name)}`, {
      roleTitle: title || '',
      abilities: permissions || [],
    });
};

export default {
  fetchPermissions,
  fetchRole,
  fetchRolePermissions,
  fetchRolesList,
  removeRole,
  updateRole,
};
