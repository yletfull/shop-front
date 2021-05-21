import SegmentsList from './SegmentsList';
import Upload from './Upload';

export const patchs = {
  upload: '/',
  segments: '/segments',
};

export const titles = {
  upload: 'Загрузка',
  segments: 'Сегменты',
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
  },
  {
    Component: SegmentsList,
    path: patchs.segments,
    title: titles.segments,
  },
];
