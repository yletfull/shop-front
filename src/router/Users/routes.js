import Roles from './Roles';
import UsersList from './UsersList';

export const patchs = {
  usersList: '/users/list',
  roles: '/users/roles',
};

export const titles = {
  usersList: 'Список пользователей',
  roles: 'Роли',
};

export default [
  {
    path: patchs.usersList,
    redirect: patchs.usersList,
    Component: UsersList,
    meta: {
      title: titles.usersList,
    },
  },
  {
    path: patchs.roles,
    redirect: patchs.roles,
    Component: Roles,
    meta: {
      title: titles.roles,
    },
  },
];
