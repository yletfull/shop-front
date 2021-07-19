import { lazy } from 'react';

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
    Component: lazy(() => import(
      /* webpackChunkName: 'statistics-tasks' */
      /* webpackMode: 'lazy' */
      './Tasks'
    )),
    path: paths.tasks,
    title: titles.tasks,
  },
  {
    Component: lazy(() => import(
      /* webpackChunkName: 'statistics-campaigns' */
      /* webpackMode: 'lazy' */
      './Campaigns'
    )),
    path: paths.campaigns,
    title: titles.campaigns,
  },
  {
    Component: lazy(() => import(
      /* webpackChunkName: 'statistics-platforms' */
      /* webpackMode: 'lazy' */
      './Platforms'
    )),
    path: paths.platforms,
    title: titles.platforms,
  },
  {
    Component: lazy(() => import(
      /* webpackChunkName: 'statistics-sites' */
      /* webpackMode: 'lazy' */
      './Sites'
    )),
    path: paths.sites,
    title: titles.sites,
  },
  {
    Component: lazy(() => import(
      /* webpackChunkName: 'statistics-spheres' */
      /* webpackMode: 'lazy' */
      './Spheres'
    )),
    path: paths.spheres,
    title: titles.spheres,
  },
];
