import api from '@/api';
import { apiBaseUrl } from './constants';

const fetchAudiencesList = function serviseFetchAudiencesList(params) {
  return api
    .get(`${apiBaseUrl}/audiences/`, { params })
    .then((response) => response.data);
};

export default {
  fetchAudiencesList,
};
