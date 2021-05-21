import api from '@/api';

const fetchUsers = (params) => api.get('api/v1/user', { params })
  .then((data) => data);

export default {
  fetchUsers,
};
