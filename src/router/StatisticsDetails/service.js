import api from '@/api';

const baseUrl = 'api/v1/statistics';

const fetchEntities = function serviceFetchEntities(entityType) {
  if (!entityType) {
    return;
  }

  return api
    .get(`${baseUrl}/${encodeURIComponent(entityType)}/dict`)
    .then((response) => response.data.data);
};

const fetchEntityDynamics = function serviceFetchEntityDynamics(
  entityType,
  entityId,
  params
) {
  if (!entityType || !entityId) {
    return;
  }

  const entity = encodeURIComponent(entityType);
  const id = encodeURIComponent(entityId);

  return api
    .get(`${baseUrl}/${entity}/${id}/dynamics`, { params })
    .then((response) => response.data);
};

const fetchReactionsTonality = function serviceFetchReactionsTonality(
  entityType,
  entityId,
  params
) {
  if (!entityType || !entityId) {
    return;
  }

  const entity = encodeURIComponent(entityType);
  const id = encodeURIComponent(entityId);

  return api
    .get(`${baseUrl}/${entity}/${id}/reactions/tonality`, { params })
    .then((response) => response.data);
};

export default {
  fetchEntities,
  fetchEntityDynamics,
  fetchReactionsTonality,
};
