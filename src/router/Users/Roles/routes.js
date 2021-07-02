import RolesTable from './components/RolesTable';
import Details from './details';

export const patchs = {
  rolesTable: '/users/roles',
  details: '/users/roles/:roleName/details',
};

export const titles = {
  rolesTable: 'Список пользователей',
  details: 'Роли',
};

export default [
  {
    path: patchs.rolesTable,
    redirect: patchs.rolesTable,
    Component: RolesTable,
    meta: {
      title: titles.rolesTable,
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
