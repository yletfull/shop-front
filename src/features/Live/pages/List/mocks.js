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
    icon: TestImage,
    platform: 'vk',
    placement: 'promotedPost',
    device: 'mobile',
  },
  {
    id: 2,
    href: 'https://vk.com/adscreate',
    date: dayjs().format(DATE_FORMAT),
    title: 'Событие 2.',
    content: TestImage,
    image: TestImage,
    icon: TestImage,
    platform: 'vk',
    placement: 'story',
    device: 'mobile',
  },
  {
    id: 3,
    href: 'https://vk.com/adscreate',
    date: dayjs().format(DATE_FORMAT),
    title: 'Событие 3.',
    content: 'Контент 3.',
    image: TestImage,
    icon: TestImage,
    platform: 'fb',
    placement: 'promotedPost',
    device: 'mobile',
  },
  {
    id: 4,
    href: 'https://vk.com/adscreate',
    date: dayjs().format(DATE_FORMAT),
    title: 'Событие 4.',
    content: TestImage,
    image: TestImage,
    icon: TestImage,
    platform: 'fb',
    placement: 'story',
    device: 'mobile',
  },
  {
    id: 5,
    href: 'https://vk.com/adscreate',
    date: dayjs().format(DATE_FORMAT),
    title: 'Событие 4.',
    content: TestImage,
    image: TestImage,
    icon: TestImage,
    platform: 'vk',
    placement: 'promotedPost',
    device: 'desktop',
  },
  {
    id: 6,
    href: 'https://vk.com/adscreate',
    date: dayjs().format(DATE_FORMAT),
    title: 'Событие 4.',
    content: TestImage,
    image: TestImage,
    icon: TestImage,
    platform: 'fb',
    placement: 'promotedPost',
    device: 'desktop',
  },
];

export default {
  cards,
};
