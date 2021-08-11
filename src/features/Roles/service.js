import api from '@/api';
import { apiBaseUrl } from './constants';

const fetchPermissions = function serviceFetchPermissions(params) {
  return api
    .get(`${apiBaseUrl}/abilities`, { params })
    .then((response) => response.data);
};

const fetchRole = function serviceFetchRole({ name, params }) {
  return api
    .get(`${apiBaseUrl}/role/${encodeURIComponent(name)}/abilities`, { params })
    .then((response) => response.data);
};

const fetchRolesList = function serviceFetchRolesList(params) {
  return api
    .get(`${apiBaseUrl}/roles`, { params })
    .then((response) => response.data);
};

export default {
  fetchPermissions,
  fetchRole,
  fetchRolesList,
};
