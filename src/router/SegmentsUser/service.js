import api from '@/api';

const baseUrl = 'api/ctor/v1/user-entity';

/**
 * Entity for tests:
 * 000011c54577cefea56a6d5bdd879ca5
 */

const fetchAttributes = function serviceFetchAttributes(entity) {
  if (!entity) {
    return;
  }
  return api
    .get(`${baseUrl}/attributes`, { params: { entity } })
    .then((response) => response.data);
};

const fetchSegments = function serviceFetchSegments(entity, params) {
  if (!entity) {
    return;
  }
  return api
    .get(`${baseUrl}/segments`, { params: { ...params, entity } })
    .then((response) => response.data);
};

export default {
  fetchAttributes,
  fetchSegments,
};
