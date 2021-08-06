export const paths = {
  usersList: 'users',
  usersNew: 'users/new',
  usersDetails: 'users/details/:id',
  rolesList: 'roles',
};

export const titles = {
  usersList: 'Пользователи',
  usersNew: 'Новый пользователь',
  usersDetails: 'Пользователь',
  rolesList: 'Роли',
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
