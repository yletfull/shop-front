import { lazy } from 'react';
import { sections } from '@/constants/rights';

const AudiencesList = lazy(() => import(
  /* webpackChunkName: 'audiences-list' */
  /* webpackMode: 'lazy' */
  '@/features/Audiences/pages/List'
));
const AudiencesDetails = lazy(() => import(
  /* webpackChunkName: 'audiences-details' */
  /* webpackMode: 'lazy' */
  '@/features/Audiences/pages/Details'
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
  segmentsDetails: '/segments/details/:id',
  segmentsNew: '/segments/new',
  segmentsUser: '/segments/user/',
  statisticsDetails: '/statistics/details/:entityType/:id?',
  upload: '/upload',
  users: '/users',
  statistics: '/statistics/lists',
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
    Component: SegmentsNew,
    path: patchs.segmentsNew,
    title: titles.segmentsNew,
  },
  {
    Component: SegmentsDetails,
    path: patchs.segmentsDetails,
    title: titles.segmentsDetails,
    rights: {
      section: sections.segment,
      actions: [],
    },
  },
  {
    Component: SegmentsUser,
    path: patchs.segmentsUser,
    title: titles.segmentsUser,
    rights: {
      section: sections.segment,
      actions: [],
    },
  },
  {
    Component: SegmentsList,
    path: patchs.segments,
    title: titles.segments,
    rights: {
      section: sections.segment,
      actions: [],
    },
  },
  {
    Component: SegmentsList,
    path: patchs.segments,
    title: titles.segments,
  },
  {
    Component: AudiencesDetails,
    path: patchs.audiencesDetails,
    title: titles.audiencesDetails,
  },
  {
    Component: AudiencesList,
    path: patchs.audiencesList,
    title: titles.audiencesList,
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
