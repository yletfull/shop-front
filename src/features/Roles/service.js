import api from '@/api';
import { apiBaseUrl } from './constants';

const fetchRolesList = function serviceFetchRolesList(params) {
  return api
    .get(`${apiBaseUrl}/roles`, { params })
    .then((response) => response.data);
};

export default {
  fetchRolesList,
};
