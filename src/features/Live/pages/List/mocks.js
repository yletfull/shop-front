import dayjs from 'dayjs';
import TestImage from '@/images/TestImage.jpg';
import { DATE_FORMAT } from '../../constants';

export const cards = [
  {
    id: 1,
    href: 'https://vk.com/adscreate',
    date: dayjs().format(DATE_FORMAT),
    title: 'Событие 1.',
    content: 'Контент',
    image: TestImage,
    platform: 'fb',
    placement: 'promotedPost',
  },
  {
    id: 2,
    href: 'https://vk.com/adscreate',
    date: dayjs().format(DATE_FORMAT),
    title: 'Событие 2.',
    content: TestImage,
    image: TestImage,
    platform: 'vk',
    placement: 'story',
  },
  {
    id: 3,
    href: 'https://vk.com/adscreate',
    date: dayjs().format(DATE_FORMAT),
    title: 'Событие 3.',
    content: 'Контент 3.',
    image: TestImage,
    platform: 'vk',
    placement: 'promotedPost',
  },
  {
    id: 4,
    href: 'https://vk.com/adscreate',
    date: dayjs().format(DATE_FORMAT),
    title: 'Событие 4.',
    content: 'Контент 4.',
    image: TestImage,
    platform: 'vk',
    placement: 'promotedPost',
  },
  {
    id: 5,
    href: 'https://vk.com/adscreate',
    date: dayjs().format(DATE_FORMAT),
    title: 'Событие 5.',
    content: 'Контент 5.',
    image: TestImage,
    platform: 'vk',
    placement: 'promotedPost',
  },
  {
    id: 6,
    href: 'https://vk.com/adscreate',
    date: dayjs().format(DATE_FORMAT),
    title: 'Событие 6.',
    content: 'Контент 6.',
    image: TestImage,
    platform: 'vk',
    placement: 'promotedPost',
  },
  {
    id: 7,
    href: 'https://vk.com/adscreate',
    date: dayjs().format(DATE_FORMAT),
    title: 'Событие 7. Текст',
    image: TestImage,
    platform: 'vk',
    placement: 'promotedPost',
  },
];

export default {
  cards,
};
