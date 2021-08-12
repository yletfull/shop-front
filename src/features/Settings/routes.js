import UsersDetails from '@/features/Users/pages/Details';
import UsersEdit from '@/features/Users/pages/Edit';
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
    Component: UsersDetails,
    path: paths.usersDetails || '',
  },
  {
    Component: UsersEdit,
    path: paths.usersEdit || '',
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