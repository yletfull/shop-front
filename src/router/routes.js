import SegmentsDetails from './SegmentsDetails';
import SegmentsList from './SegmentsList';
import SegmentsUser from './SegmentsUser';
import Upload from './Upload';
import Users from './Users';

export const patchs = {
  upload: '/upload',
  users: '/users',
  segments: '/segments',
  segmentsDetails: '/segments/details/:id',
  segmentsUser: '/segments/user/',
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
