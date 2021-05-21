import Upload from './Upload';

export const patchs = {
  upload: '/',
  roles: '/roles',
};

export const titles = {
  upload: 'Загрузка',
  roles: 'Роли',
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
    path: patchs.roles,
    redirect: patchs.roles,
    Component: Upload,
    meta: {
      title: titles.roles,
    },
  },
];
