import api from '@/api';

const baseUrl = 'api/v1/external/api/v1';

const fetchSegments = function serviceFetchSegments(params) {
  return api
    .get(`${baseUrl}/segments/`, { params })
    .then((response) => response.data);
};

export default {
  fetchSegments,
};
