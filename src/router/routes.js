import SegmentsUser from './SegmentsUser';
import Upload from './Upload';

export const patchs = {
  segmentsUser: '/segments/user/',
  upload: '/',
};

export const titles = {
  segmentsUser: 'Портрет пользователя',
  upload: 'Загрузка',
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
    Component: SegmentsUser,
    path: patchs.segmentsUser,
    title: titles.segmentsUser,
  },
];
