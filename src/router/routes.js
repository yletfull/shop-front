import { lazy } from 'react';

const SegmentsDetails = lazy(() => import('./SegmentsDetails'));
const SegmentsList = lazy(() => import('./SegmentsList'));
const SegmentsUser = lazy(() => import('./SegmentsUser'));
const Upload = lazy(() => import('./Upload'));
const Users = lazy(() => import('./Users'));

export const patchs = {
  segments: '/segments',
  segmentsDetails: '/segments/details/:id',
  segmentsUser: '/segments/user/',
  upload: '/upload',
  users: '/users',
};

export const titles = {
  upload: 'Загрузка',
  users: 'Пользователи',
  segments: 'Сегменты',
  segmentsDetails: 'Сегмент',
  segmentsUser: 'Портрет пользователя',
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
  {
    Component: SegmentsList,
    path: patchs.segments,
    title: titles.segments,
  },
  {
    Component: SegmentsDetails,
    path: patchs.segmentsDetails,
    title: titles.segmentsDetails,
  },
  {
    Component: SegmentsUser,
    path: patchs.segmentsUser,
    title: titles.segmentsUser,
  },
];
