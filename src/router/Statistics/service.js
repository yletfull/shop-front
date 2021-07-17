import api from '@/api';

const API_URL = 'api/v1/statistics';

const generateFetchList = (entity) => (params, { cancelToken }) => api
  .get(`${API_URL}/${entity}`, { params, cancelToken })
  .then((data) => data);

const fetchTasks = generateFetchList('tasks');

export default {
  fetchTasks,
};
