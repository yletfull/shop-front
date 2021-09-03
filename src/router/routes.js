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
const Settings = lazy(() => import(
  /* webpackChunkName: 'settings' */
  /* webpackMode: 'lazy' */
  '@/features/Settings/pages/Main'
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
const StatisticsRoot = lazy(() => import(
  /* webpackChunkName: 'statistics-root' */
  /* webpackMode: 'lazy' */
  '@/features/Statistics/pages/Root'
));
const StatisticsList = lazy(() => import(
  /* webpackChunkName: 'statistics-list' */
  /* webpackMode: 'lazy' */
  '@/features/Statistics/pages/List'
));

export const patchs = {
  audiencesList: '/audiences',
  audiencesDetails: '/audiences/details/:id',
  segments: '/segments',
  segmentsDetails: '/segments/details/:id',
  segmentsNew: '/segments/new',
  segmentsUser: '/segments/user/',
  settings: '/settings',
  statisticsDetails: '/statistics/details/:entityType/:id?',
  upload: '/upload',
  statistics: '/statistics',
  statisticsLists: '/statistics/lists/:entity(tasks|campaigns|platforms|spheres|sites)',
};

export const titles = {
  audiencesList: 'Аудитории',
  audiencesDetails: 'Описание аудитории',
  upload: 'Загрузка',
  segments: 'Сегменты',
  segmentsDetails: 'Детали сегмента',
  segmentsNew: 'Новый сегмент',
  segmentsUser: 'Портрет пользователя',
  settings: 'Настройки',
  statisticsDetails: 'Статистика',
  statistics: 'Статистика',
  statisticsLists: 'Статистика',
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
    rights: {
      section: sections.campaign,
      actions: [],
    },
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
    Component: AudiencesDetails,
    path: patchs.audiencesDetails,
    title: titles.audiencesDetails,
  },
  {
    exact: true,
    Component: AudiencesList,
    path: patchs.audiencesList,
    title: titles.audiencesList,
  },
  {
    Component: Settings,
    path: patchs.settings,
    title: titles.settings,
    rights: {
      section: sections.user,
      actions: [],
    },
  },
  {
    Component: StatisticsDetails,
    path: patchs.statisticsDetails,
    title: titles.statisticsDetails,
  },
  {
    Component: StatisticsList,
    path: patchs.statisticsLists,
    title: titles.statisticsLists,
    rights: {
      section: sections.stats,
      actions: [],
    },
  },
  {
    Component: StatisticsRoot,
    path: patchs.statistics,
    title: titles.statistics,
    rights: {
      section: sections.stats,
      actions: [],
    },
  },
];
