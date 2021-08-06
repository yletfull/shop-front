import api from '@/api';
import { apiBaseUrl } from './constants';

export const fetchUsersList = function serviceFetchUsersList(params) {
  return api
    .get(`${apiBaseUrl}/users`, { params })
    .then((response) => response.data);
};

export default {
  fetchUsersList,
};
