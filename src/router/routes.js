import { lazy } from 'react';
import { sections } from '@/constants/rights';

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

export const patchs = {
  audiencesList: '/audiences',
  audiencesDetails: '/audiences/details/:id',
  segments: '/segments',
  segmentsDetails: '/segments/details/:id',
  segmentsUser: '/segments/user/',
  statisticsDetails: '/statistics/details/:entityType/:id?',
  upload: '/upload',
  users: '/users',
};

export const titles = {
  audiencesList: 'Аудитории',
  audiencesDetails: 'Описание аудитории',
  upload: 'Загрузка',
  users: 'Пользователи',
  segments: 'Сегменты',
  segmentsDetails: 'Сегмент',
  segmentsUser: 'Портрет пользователя',
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
    Component: StatisticsDetails,
    path: patchs.statisticsDetails,
    title: titles.statisticsDetails,
    rights: {
      section: sections.stats,
      actions: [],
    },
  },
];
