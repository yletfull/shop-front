import UsersTable from './components/UsersTable';
import Details from './details';

export const patchs = {
  usersTable: '/users/list',
  details: '/users/list/:userId/details',
};

export const titles = {
  rolesTable: 'Список пользователей',
  details: 'Детали',
};

export default [
  {
    path: patchs.usersTable,
    redirect: patchs.usersTable,
    Component: UsersTable,
    meta: {
      title: titles.usersTable,
    },
    exact: true,
  },
  {
    path: patchs.details,
    redirect: patchs.details,
    Component: Details,
    meta: {
      title: titles.details,
    },
    exact: true,
  },
];
