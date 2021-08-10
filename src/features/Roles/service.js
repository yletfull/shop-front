import api from '@/api';
import { apiBaseUrl } from './constants';

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
  fetchRole,
  fetchRolesList,
};
