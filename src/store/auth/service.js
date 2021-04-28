// import api from '@/api';

const check = () => (
  // api.post('api/v1/auth', { params }).then((data) => data);
  {
    data: {
      id: '4057bee6-a3e0-46ec-a22d-1034020d41b0',
      login: 'superadmin',
      email: 'superadmin@adv.local',
      phone: null,
      createdAt: '2021-04-16T13:27:40.247427Z',
      updatedAt: null,
    },
    meta: {
      availableIncludes: [
        'roles',
      ],
    },
  });
const login = () => (
// api.post('api/v1/auth', { params }).then((data) => data);
  {
    data: {
      id: '4057bee6-a3e0-46ec-a22d-1034020d41b0',
      login: 'superadmin',
      email: 'superadmin@adv.local',
      phone: null,
      createdAt: '2021-04-16T13:27:40.247427Z',
      updatedAt: null,
    },
    meta: {
      availableIncludes: [
        'roles',
      ],
    },
  });

const launchOauth = () => {};

const logout = () => {};

export default {
  check,
  login,
  launchOauth,
  logout,
};
