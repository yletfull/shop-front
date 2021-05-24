import api from '@/api';

const getUsers = (params) => api.get('api/v1/users', { params })
  .then((data) => data);


const getRoles = (params) => api.get('api/v1/rbac/roles', { params })
  .then((data) => data);

const getUserDetails = ({ userId }) => api.get(`api/v1/user/${userId}`)
  .then((data) => data);

export default {
  getUsers,
  getRoles,
  getUserDetails,
};
