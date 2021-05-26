import { lazy } from 'react';

const SegmentsDetails = lazy(() => import(
  /* webpackChunkName: 'segments-details' */
  /* webpackMode: 'lazy' */
  './SegmentsDetails'
));
const SegmentsList = lazy(() => import(
  /* webpackChunkName: 'segments-list' */
  /* webpackMode: 'lazy' */
  './SegmentsList'
));
const SegmentsUser = lazy(() => import(
  /* webpackChunkName: 'segments-user' */
  /* webpackMode: 'lazy' */
  './SegmentsUser'
));
const Upload = lazy(() => import(
  /* webpackChunkName: 'upload' */
  /* webpackMode: 'lazy' */
  './Upload'
));
const Users = lazy(() => import(
  /* webpackChunkName: 'users' */
  /* webpackMode: 'lazy' */
  './Users'
));

export const patchs = {
  segments: '/segments',
  segmentsDetails: '/segments/details/:id',
  segmentsEdit: '/segments/edit/:id?',
  segmentsUser: '/segments/user/',
  upload: '/upload',
  users: '/users',
};

export const titles = {
  upload: 'Загрузка',
  users: 'Пользователи',
  segments: 'Сегменты',
  segmentsDetails: 'Сегмент',
  segmentsEdit: 'Редактирование сегмента',
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
    Component: SegmentsDetails,
    path: patchs.segmentsDetails,
    title: titles.segmentsDetails,
  },
  {
    Component: SegmentsEdit,
    path: patchs.segmentsEdit,
    title: titles.segmentsEdit,
  },
  {
    Component: SegmentsUser,
    path: patchs.segmentsUser,
    title: titles.segmentsUser,
  },
  {
    Component: SegmentsList,
    path: patchs.segments,
    title: titles.segments,
  },
];
