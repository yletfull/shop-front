export const paths = {
  rolesDetails: 'roles/details/:name',
  rolesEdit: 'roles/edit/:name',
  rolesList: 'roles',
  rolesNew: 'roles/new',
  usersDetails: 'users/details/:id',
  usersEdit: 'users/edit/:id',
  usersList: 'users',
  usersNew: 'users/new',
};

export const titles = {
  rolesDetails: 'Роль',
  rolesEdit: 'Редактирование роли',
  rolesList: 'Роли',
  rolesNew: 'Новая роль',
  usersDetails: 'Пользователь',
  usersEdit: 'Редактирование пользователя',
  usersList: 'Пользователи',
  usersNew: 'Новый пользователь',
};

export const sections = [
  {
    key: 'users',
    label: titles.usersList,
    to: paths.usersList,
  },
  {
    key: 'roles',
    label: titles.rolesList,
    to: paths.rolesList,
  },
];

export default {
  paths,
  sections,
  titles,
};
