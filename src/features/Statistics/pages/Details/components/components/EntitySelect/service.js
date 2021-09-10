import api from '@/api';

const baseUrl = 'api/core/v1/statistics';

const fetchEntities = function serviceFetchEntities(entityType) {
  if (!entityType) {
    return;
  }

  return api
    .get(`${baseUrl}/${encodeURIComponent(entityType)}/dict`)
    .then((response) => response.data.data);
};

export default {
  fetchEntities,
};
