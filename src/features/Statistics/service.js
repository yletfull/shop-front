import api from '@/api';

const API_URL = 'api/v1/statistics';

export const fetchPeriods = (params = {}) => (
  api
    .get(`${API_URL}/periods`, { params })
    .then((response) => response.data.data)
);

export const fetchList = ({ entity, ...params }, { cancelToken } = {}) => (
  api
    .get(`${API_URL}/${entity}`, { params, cancelToken })
    .then((response) => response.data)
);

export default {
  fetchPeriods,
  fetchList,
};
