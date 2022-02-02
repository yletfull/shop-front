export const usersRoles = {
  admin: 'ADMIN',
  user: 'USER',
  guest: 'GUEST',
};

export const usersRolesIds = {
  [usersRoles.admin]: 3,
  [usersRoles.user]: 2,
  [usersRoles.guest]: 1,
};

export const usersRolesTitles = {
  [usersRoles.admin]: 'Администратор',
  [usersRoles.user]: 'Пользователь',
  [usersRoles.guest]: 'Гость',
};

export default {
  usersRoles,
  usersRolesTitles,
  usersRolesIds,
};
