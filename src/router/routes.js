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
const SegmentsEdit = lazy(() => import(
  /* webpackChunkName: 'segments-edit' */
  /* webpackMode: 'lazy' */
  './SegmentsEdit'
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
const StatisticsDetails = lazy(() => import(
  /* webpackChunkName: 'statistics-details' */
  /* webpackMode: 'lazy' */
  './StatisticsDetails'
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
const Statistics = lazy(() => import(
  /* webpackChunkName: 'statistics' */
  /* webpackMode: 'lazy' */
  './Statistics'
));

export const patchs = {
  audiencesList: '/audiences',
  audiencesDetails: '/audiences/details/:id',
  segments: '/segments',
  segmentsEdit: '/segments/edit/:id?',
  segmentsUser: '/segments/user/',
  statisticsDetails: '/statistics/details/:entityType/:id?',
  upload: '/upload',
  users: '/users',
  statistics: '/statistics',
};

export const titles = {
  audiencesList: 'Аудитории',
  audiencesDetails: 'Описание аудитории',
  upload: 'Загрузка',
  users: 'Пользователи',
  segments: 'Сегменты',
  segmentsEdit: 'Редактирование сегмента',
  segmentsUser: 'Портрет пользователя',
  statistics: 'Статистика',
  statisticsDetails: 'Статистика',
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
  {
    exact: true,
    Component: AudiencesList,
    path: patchs.audiencesList,
    title: titles.audiencesList,
  },
  {
    Component: AudiencesDetails,
    path: patchs.audiencesDetails,
    title: titles.audiencesDetails,
  },
  {
    Component: Statistics,
    path: patchs.statistics,
    title: titles.statistics,
  },
  {
    Component: StatisticsDetails,
    path: patchs.statisticsDetails,
    title: titles.statisticsDetails,
  },
];
