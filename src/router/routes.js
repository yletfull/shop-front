import Upload from './Upload';

export const patchs = {
  upload: '/',
};

export const titles = {
  upload: 'Загрузка',
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
];
