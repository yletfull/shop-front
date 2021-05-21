import Upload from './Upload';

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
  },
  {
    path: patchs.users,
    redirect: patchs.users,
    Component: Upload,
    meta: {
      title: titles.users,
    },
  },
];
