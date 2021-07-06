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

const getSegmentDownloadLink = function serviceGetSegmentDownloadLink(
  id,
  data,
) {
  const url = id
    ? `${baseUrl}/segments/${id}/export/`
    : `${baseUrl}/segments/export/`;
  const params = Object.keys(data).reduce((acc, key) => {
    if (key === 'segment') {
      return acc;
    }
    if (Array.isArray(data[key])) {
      return ({ ...acc, [key]: data[key].join() });
    }
    return ({ ...acc, [key]: data[key] });
  }, {});
  return api({
    data: !id ? data : {},
    params: id ? params : {},
    url,
    method: id ? 'get' : 'post',
    responseType: 'blob',
  })
    .then((response) => window
      .URL
      .createObjectURL(new Blob([response.data], { type: 'application/zip' })));
};

const getSegmentStatistics = function serviceGetSegmentStatistics({
  id,
  attributes,
}) {
  const url = id
    ? `${baseUrl}/segments/${id}/stats/`
    : `${baseUrl}/segments/stats/`;
  return api({
    url,
    method: id ? 'get' : 'post',
    data: id ? null : attributes,
  })
    .then((response) => response.data.data);
};

export default {
  fetchParams,
  fetchSegment,
  getSegmentDownloadLink,
  getSegmentStatistics,
  saveSegment,
};
