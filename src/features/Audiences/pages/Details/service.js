import api from '@/api';

const baseUrl = 'api/v1/external/ctor/api/v1';

const fetchAudienceCompare = function serviceFetchAudienceCompare(id, params) {
  return api
    .get(`${baseUrl}/audiences/${id}/compared/`, { params })
    .then((response) => response.data.data);
};

const fetchAudienceDetails = function serviceFetchAudienceDetails(id) {
  return api
    .get(`${baseUrl}/audiences/${id}`)
    .then((response) => response.data.data);
};

export default {
  fetchAudienceCompare,
  fetchAudienceDetails,
};
