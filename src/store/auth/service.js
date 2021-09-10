import api from '@/api';

const baseUrl = 'api/auth';

const check = function serviceAuthCheck() {
  return api
    .get(`${baseUrl}/info`)
    .then((response) => response.data.data);
};

const login = function serviceAuthLogin(data) {
  return api
    .post(`${baseUrl}/login`, data)
    .then((response) => response.data.data);
};

const logout = function serviceAuthLogout() {
  return api
    .post(`${baseUrl}/logout`)
    .then((response) => response.data.data);
};

export default {
  check,
  login,
  logout,
};
