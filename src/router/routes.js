import SegmentsList from './SegmentsList';
import Upload from './Upload';
import Users from './Users';

export const patchs = {
  segments: '/segments',
  upload: '/upload',
  users: '/users',
};

export const titles = {
  upload: 'Загрузка',
  users: 'Пользователи',
  segments: 'Сегменты',
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
    Component: SegmentsList,
    path: patchs.segments,
    title: titles.segments,
  },
];
