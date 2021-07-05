import api from '@/api';

const baseUrl = 'api/v1/external/ctor/api/v1';

const fetchParams = function serviceFetchSegmentsAttributes() {
  return api
    .get(`${baseUrl}/attributes/`)
    .then((response) => response.data.data);
};
const fetchSegment = function serviceFetchSegment(id) {
  if (typeof id === 'undefined') {
    return Promise.reject(new Error('`id` not found'));
  }
  return api
    .get(`${baseUrl}/segments/${id}/`)
    .then((response) => response.data.data);
};
const saveSegment = function serviceSaveSegment(params) {
  return api
    .post(`${baseUrl}/segments/`, params)
    .then((response) => response.data.data);
};

const downloadSegmentById = function serviceDownloadSegmentById(params, id) {
  if (!id) {
    return;
  }
  return api
    .get(`${baseUrl}/segments/${id}/export/`, { params });
};
const downloadSegmentByMeta = function serviceDownloadSegmentByMeta(params) {
  return api
    .post(`${baseUrl}/segments/export/`, params);
};

export default {
  downloadSegmentById,
  downloadSegmentByMeta,
  fetchParams,
  fetchSegment,
  saveSegment,
};
