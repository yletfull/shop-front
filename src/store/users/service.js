import api from '@/api';

const getUsers = (params) => api.get('api/v1/users', { params })
  .then((data) => data);


const getRoles = (params) => api.get('api/v1/roles', { params })
  .then((data) => data);

export default {
  getUsers,
  getRoles,
};
