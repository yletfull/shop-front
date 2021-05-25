import api from '@/api';

const getUsers = (params) => api.get('api/v1/users', { params })
  .then((data) => data);

const getUserDetails = ({ userId }) => api.get(`api/v1/user/${userId}`)
  .then((data) => data);

const getUserRoles = ({ userId }) => api.get(`api/v1/user/${userId}/roles`)
  .then((data) => data);

const getAllRoles = (params) => api.get('api/v1/rbac/roles', { params })
  .then((data) => data);

const setUserRoles = ({ userId, ...params }) => api.patch(`api/v1/user/${userId}/roles`, { ...params })
  .then((data) => data);

const removeUserRole = ({ userId, roleName }) => api.delete(`api/v1/user/${userId}/roles/${roleName}`)
  .then((data) => data);


const getRolesDetails = ({ roleName }) => api.get(`api/v1/rbac/role/${roleName}`)
  .then((data) => data);

const getRoleAbilities = ({ roleName }) => api.get(`api/v1/rbac/role/${roleName}/abilities`)
  .then((data) => data);

const getAllRoleAbilities = () => api.get('api/v1/rbac/abilities')
  .then((data) => data);

const editRole = ({ roleName, ...params }) => api.patch(`api/v1/rbac/role/${roleName}`, { ...params })
  .then((data) => data);

const createRole = (params) => api.post('api/v1/rbac/role', { ...params })
  .then((data) => data);

export default {
  getUsers,
  getAllRoles,
  getUserDetails,
  getUserRoles,
  setUserRoles,
  removeUserRole,
  getRolesDetails,
  getRoleAbilities,
  getAllRoleAbilities,
  editRole,
  createRole,
};
