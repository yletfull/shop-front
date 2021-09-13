import { withBase } from '@/api';

const getQuerryString = function serviceGetQueryString(params) {
  return new URLSearchParams(params).toString();
};

export const getDownloadLink = function serviceGetDownloadLink(params) {
  const { id, entityTypes, fileName } = params || {};
  if (!id || !entityTypes || !Array.isArray(entityTypes) || !fileName) {
    return;
  }
  const search = getQuerryString(params);
  return withBase(`api/ctor/v1/segments/${encodeURIComponent(id)}/export?${search}`);
};

export default {
  getDownloadLink,
};
