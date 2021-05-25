import SegmentsUser from './SegmentsUser';
import Upload from './Upload';
import Users from './Users';

export const patchs = {
  upload: '/upload',
  users: '/users',
  segmentsUser: '/segments/user/',
};

export const titles = {
  segmentsUser: 'Портрет пользователя',
  upload: 'Загрузка',
  users: 'Пользователи',
};

export default [
  {
    exact: true,
    path: patchs.upload,
    redirect: patchs.upload,
    Component: Upload,
    meta: {
      title: titles.main,
    },
  },
  {
    path: patchs.users,
    redirect: patchs.users,
    Component: Users,
    meta: {
      title: titles.users,
    },
  },
  {
    Component: SegmentsUser,
    path: patchs.segmentsUser,
    title: titles.segmentsUser,
  },
];
