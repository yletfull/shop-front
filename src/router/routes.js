import { lazy } from 'react';

const AudiencesList = lazy(() => import(
  /* webpackChunkName: 'audiences-list' */
  /* webpackMode: 'lazy' */
  './AudiencesList'
));
const AudiencesDetails = lazy(() => import(
  /* webpackChunkName: 'audiences-details' */
  /* webpackMode: 'lazy' */
  './AudiencesDetails'
));
const SegmentsDetails = lazy(() => import(
  /* webpackChunkName: 'segments-details-page' */
  /* webpackMode: 'lazy' */
  '@/features/Segments/pages/Details'
));
const SegmentsNew = lazy(() => import(
  /* webpackChunkName: 'segments-new-page' */
  /* webpackMode: 'lazy' */
  '@/features/Segments/pages/New'
));
const SegmentsList = lazy(() => import(
  /* webpackChunkName: 'segments-list' */
  /* webpackMode: 'lazy' */
  '@/features/Segments/pages/List'
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
  audiencesList: '/audiences',
  audiencesDetails: '/audiences/details/:id',
  segments: '/segments',
  segmentsDetails: '/segments/details/:id',
  segmentsNew: '/segments/new',
  segmentsUser: '/segments/user/',
  upload: '/upload',
  users: '/users',
};

export const titles = {
  audiencesList: 'Аудитории',
  audiencesDetails: 'Описание аудитории',
  upload: 'Загрузка',
  users: 'Пользователи',
  segments: 'Сегменты',
  segmentsDetails: 'Детали сегмента',
  segmentsNew: 'Новый сегмент',
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
    Component: SegmentsNew,
    path: patchs.segmentsNew,
    title: titles.segmentsNew,
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
  {
    Component: SegmentsList,
    path: patchs.segments,
    title: titles.segments,
  },
  {
    Component: AudiencesList,
    path: patchs.audiencesList,
    title: titles.audiencesList,
  },
  {
    Component: AudiencesDetails,
    path: patchs.audiencesDetails,
    title: titles.audiencesDetails,
  },
];
