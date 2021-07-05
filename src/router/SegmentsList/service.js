import api from '@/api';

const baseUrl = 'api/v1/external/ctor/api/v1';

const downloadSegmentFile = function serviceDownloadSegmentFile(params) {
  return api
    .post(`${baseUrl}/segments/export/`, params);
};

const fetchSegments = function serviceFetchSegments(params) {
  return api
    .get(`${baseUrl}/segments/`, { params })
    .then((response) => response.data);
};

export default {
  downloadSegmentFile,
  fetchSegments,
};
