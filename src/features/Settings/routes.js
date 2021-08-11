import RolesDetails from '@/features/Roles/pages/Details';
import RolesEdit from '@/features/Roles/pages/Edit';
import RolesList from '@/features/Roles/pages/List';
import RolesNew from '@/features/Roles/pages/New';
import UsersDetails from '@/features/Users/pages/Details';
import UsersEdit from '@/features/Users/pages/Edit';
import UsersList from '@/features/Users/pages/List';
import UsersNew from '@/features/Users/pages/New';
import { paths } from './constants';

export default [
  {
    Component: UsersDetails,
    path: paths.usersDetails || '',
  },
  {
    Component: UsersEdit,
    path: paths.usersEdit || '',
  },
  {
    Component: UsersNew,
    path: paths.usersNew || '',
  },
  {
    Component: UsersList,
    path: paths.usersList || '',
  },
  {
    Component: RolesDetails,
    path: paths.rolesDetails || '',
  },
  {
    Component: RolesEdit,
    path: paths.rolesEdit || '',
  },
  {
    Component: RolesNew,
    path: paths.rolesNew || '',
  },
  {
    Component: RolesList,
    path: paths.rolesList || '',
  },
];
