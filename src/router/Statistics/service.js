import api from '@/api';

const API_URL = 'api/v1/statistics';

const fetchList = ({ entity, params, cancelToken }) => api
  .get(`${API_URL}/${entity}`, { params, cancelToken })
  .then((data) => data);

export default {
  fetchList,
};
