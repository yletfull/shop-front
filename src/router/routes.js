import SegmentsDetails from './SegmentsDetails';
import Upload from './Upload';
import Users from './Users';

export const patchs = {
  segmentsDetails: '/segments/details/:id',
  upload: '/upload',
  users: '/users',
};

export const titles = {
  segmentsDetails: 'Сегмент',
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
    Component: SegmentsDetails,
    path: patchs.segmentsDetails,
    title: titles.segmentsDetails,
  },
];
