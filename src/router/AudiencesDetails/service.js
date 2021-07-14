import api from '@/api';

const baseUrl = 'api/v1/external/ctor/api/v1';

const fetchAudienceDetails = function serviceFetchAudienceDetails(id) {
  return api
    .get(`${baseUrl}/audiences/${id}`)
    .then((response) => response.data.data);
};

export default {
  fetchAudienceDetails,
};
