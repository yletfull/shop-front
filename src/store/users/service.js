import api from '@/api';

const getUsers = (params) => api.get('api/v1/users', { params })
  .then((data) => data);

export default {
  getUsers,
};
