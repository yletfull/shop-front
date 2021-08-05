import api from '@/api';
import { apiBaseUrl } from './constants';

const fetchAudienceCompare = function serviceFetchAudienceCompare({
  id,
  params,
}) {
  return api
    .get(`${apiBaseUrl}/audiences/${encodeURIComponent(id)}/compared/`, { params })
    .then((response) => response.data.data);
};

const fetchAudienceDetails = function serviceFetchAudienceDetails(id) {
  return api
    .get(`${apiBaseUrl}/audiences/${encodeURIComponent(id)}`)
    .then((response) => response.data.data);
};

const fetchAudiencesList = function serviseFetchAudiencesList(params) {
  return api
    .get(`${apiBaseUrl}/audiences/`, { params })
    .then((response) => response.data);
};

export default {
  fetchAudienceCompare,
  fetchAudienceDetails,
  fetchAudiencesList,
};
