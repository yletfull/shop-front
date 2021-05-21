import SegmentsDetails from './SegmentsDetails';
import Upload from './Upload';

export const patchs = {
  segmentsDetails: '/segments/details/:id',
  upload: '/',
};

export const titles = {
  segmentsDetails: 'Сегмент',
  upload: 'Загрузка',
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
    Component: SegmentsDetails,
    path: patchs.segmentsDetails,
    title: titles.segmentsDetails,
  },
];
