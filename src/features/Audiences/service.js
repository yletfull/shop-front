import api from '@/api';

const baseUrl = 'api/v1/external/ctor/api/v1';

const fetchAudiencesList = function serviseFetchAudiencesList(params) {
  return api
    .get(`${baseUrl}/audiences/`, { params })
    .then((response) => response.data);
};

export default {
  fetchAudiencesList,
};
