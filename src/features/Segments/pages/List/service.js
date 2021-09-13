import api from '@/api';

const baseUrl = 'api/ctor/v1';

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
  getSegmentDownloadLink,
};
