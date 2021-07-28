import api from '@/api';

const baseUrl = 'api/v1/statistics';

const fetchPeriods = function serviceFetchPeriod() {
  return api
    .get(`${baseUrl}/periods`)
    .then((response) => response.data.data);
};

export default {
  fetchPeriods,
};
