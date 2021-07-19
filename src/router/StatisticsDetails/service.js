import api from '@/api';

const baseUrl = 'api/v1/statistics';

const fetchEntityDictionary = function serviceFetchEntityDictionary(entity) {
  if (!entity) {
    return;
  }

  return api
    .get(`${baseUrl}/${encodeURIComponent(entity)}/dict`)
    .then((response) => response.data.data);
};

export default {
  fetchEntityDictionary,
};
