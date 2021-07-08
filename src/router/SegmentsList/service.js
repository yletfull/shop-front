import api from '@/api';

const baseUrl = 'api/v1/external/ctor/api/v1';

const fetchSegments = function serviceFetchSegments(params) {
  return api
    .get(`${baseUrl}/segments/`, { params })
    .then((response) => response.data);
};

const getSegmentDownloadLink = function serviceGetSegmentDownloadLink(
  id,
  params,
) {
  if (!id) {
    return;
  }

  const uri = `${baseUrl}/segments/${id}/export/`;
  return api
    .get(uri, { params, responseType: 'blob' })
    .then(({ data }) => window
      .URL
      .createObjectURL(new Blob([data], { type: 'application/zip' })));
};

export default {
  fetchSegments,
  getSegmentDownloadLink,
};