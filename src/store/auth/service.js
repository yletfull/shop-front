import api from '@/api';

const check = () => api.get('api/v1/auth').then((data) => data);

const login = (params) => api.post('api/v1/auth', { ...params }).then((data) => data);

const logout = () => api.delete('api/v1/auth').then((data) => data);

export default {
  check,
  login,
  logout,
};
