import UsersList from '@/features/Users/pages/List';
import RolesList from '@/features/Roles/pages/List';
import { paths } from './constants';

export default [
  {
    Component: UsersList,
    path: paths.usersList || '',
  },
  {
    Component: RolesList,
    path: paths.rolesList || '',
  },
];
