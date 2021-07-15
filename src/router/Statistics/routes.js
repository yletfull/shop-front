import { lazy } from 'react';

const Tasks = lazy(() => import(
  /* webpackChunkName: 'statistics-tasks' */
  /* webpackMode: 'lazy' */
  './Tasks'
));

export const paths = {
  tasks: '/statistics/tasks',
  campaigns: '/statistics/campaigns',
  platforms: '/statistics/platforms',
  sites: '/statistics/sites',
  spheres: '/statistics/spheres',
};

export const titles = {
  tasks: 'Задачи',
  campaigns: 'Информационные кампании',
  platforms: 'Каналы',
  sites: 'Сайты',
  spheres: 'Сферы',
};

export default [
  {
    Component: Tasks,
    path: paths.tasks,
    title: titles.tasks,
  },
];
