export const paths = {
  usersList: 'users',
  rolesList: 'roles',
};

export const titles = {
  usersList: 'Пользователи',
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
