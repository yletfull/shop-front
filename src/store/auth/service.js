import api from '@/api';

const check = () => api.get('api/v1/auth').then((data) => data);
// const check = () => setTimeout(1000, () => false);
// const check = () => new Promise((resolve, reject) => {
//   window.setTimeout(() => reject(), 1000);
// });

const login = (params) => api.post('api/v1/auth', { ...params }).then((data) => data);

const logout = () => api.delete('api/v1/auth').then((data) => data);

export default {
  check,
  login,
  logout,
};
