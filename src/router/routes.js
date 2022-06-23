import Admin from '@/pages/Admin';
import Card from '@/pages/Card';
import Shop from '@/pages/Shop';
import Auth from '@/pages/Auth';
import DevicePage from '@/pages/DevicePage';
import {
  ADMIN_ROUTE,
  CARD_ROUTE,
  DEIVCE_ROUTE_HAS_PARAMS,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from './constants';

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: DEIVCE_ROUTE_HAS_PARAMS,
    Component: DevicePage,
  },
  {
    path: CARD_ROUTE,
    Component: Card,
  },
];
