import Upload from './Upload';
import Users from './Users';

export const patchs = {
  upload: '/upload',
  users: '/users',
};

export const titles = {
  upload: 'Загрузка',
  users: 'Пользователи',
};

export default [
  {
    path: patchs.upload,
    redirect: patchs.upload,
    Component: Upload,
    meta: {
      title: titles.main,
    },
    title: titles.upload,
  },
  {
    path: patchs.users,
    redirect: patchs.users,
    Component: Users,
    meta: {
      title: titles.users,
    },
    title: titles.users,
  },
];
