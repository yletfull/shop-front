import api from '@/api';

const fetchParams = function serviceFetchSegmentsAttributes() {
  return api
    .get('api/v1/external/api/v1/attributes/')
    .then((response) => response.data.data);
};

export default {
  fetchParams,
};
