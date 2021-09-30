import React from 'react';
import dayjs from 'dayjs';
import TestImage from '@/images/TestImage.jpg';
import { DATE_FORMAT } from '../../constants';
import LiveCardsArea from './index';

export default {
  title: 'features/Live/LiveCardsArea',
  component: LiveCardsArea,
};

const banners = [
  {
    id: 1,
    href: 'https://vk.com/adscreate',
    date: dayjs().format(DATE_FORMAT),
    title: 'Событие 1.',
    content: 'Контент',
    image: TestImage,
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
    platform: 'fb',
    placement: 'promotedPost',
    device: 'desktop',
  },
];

const Template = (args) => (
  <LiveCardsArea {...args}>
    {banners.map((banner) => (
      <LiveCardsArea.Card
        key={banner.id}
        bannerData={banner}
        onClick={() => {}}
      />
    ))}
  </LiveCardsArea>
);

export const Playground = Template.bind({});
Playground.args = {
  stepX: 350,
  stepYLimits: [0, 200],
  moveSpeedX: 0.15,
};
