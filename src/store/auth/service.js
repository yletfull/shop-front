import api from '@/api';

const baseUrl = 'api/v1';

const check = function serviceAuthCheck() {
  return api
    .get(`${baseUrl}/auth`)
    .then((response) => response.data.data);
};

const login = function serviceAuthLogin(data) {
  return api
    .post(`${baseUrl}/auth`, data)
    .then((response) => response.data.data);
};

const logout = function serviceAuthLogout() {
  return api
    .delete(`${baseUrl}/auth`)
    .then((response) => response.data.data);
};

const fetchAbilities = function serviceAuthFetchAbilities(userId) {
  if (!userId) {
    return ([]);
  }
  return api
    .get(`${baseUrl}/user/${encodeURIComponent(userId)}/abilities`)
    .then((response) => response.data.data);
};

export default {
  check,
  login,
  logout,

  fetchAbilities,
};
