import api from '@/api';

const baseUrl = 'api/core/v1/statistics';

const fetchReactionsTonality = function serviceFetchReactionsTonality({
  entityType,
  entityId,
  params,
}) {
  if (!entityType || !entityId) {
    return;
  }

  const entity = encodeURIComponent(entityType);
  const id = encodeURIComponent(entityId);

  return api
    .get(`${baseUrl}/${entity}/${id}/reactions/tonality`, { params })
    .then((response) => response.data.data);
};

export default {
  fetchReactionsTonality,
};
