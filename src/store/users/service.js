import api from '@/api';

const getUsers = (params) => api.get('api/v1/users', { params })
  .then((data) => data);


const getAllRoles = (params) => api.get('api/v1/rbac/roles', { params })
  .then((data) => data);

const getUserDetails = ({ userId }) => api.get(`api/v1/user/${userId}`)
  .then((data) => data);

const getUserRoles = ({ userId }) => api.get(`api/v1/user/${userId}/roles`)
  .then((data) => data);

export default {
  getUsers,
  getAllRoles,
  getUserDetails,
  getUserRoles,
};
