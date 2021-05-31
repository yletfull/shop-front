import api from '@/api';

const fetchParams = function serviceFetchSegmentsAttributes() {
  return api
    .get('api/v1/external/api/v1/attributes/')
    .then((response) => response.data.data);
};
const fetchSegment = function serviceFetchSegment() {
  return Promise.resolve([]);
};

export default {
  fetchParams,
  fetchSegment,
};
