import UsersList from '@/features/Users/pages/List';
import UsersNew from '@/features/Users/pages/New';
import RolesList from '@/features/Roles/pages/List';
import { paths } from './constants';

export default [
  {
    Component: UsersNew,
    path: paths.usersNew || '',
  },
  {
    Component: UsersList,
    path: paths.usersList || '',
  },
  {
    Component: RolesList,
    path: paths.rolesList || '',
  },
];
