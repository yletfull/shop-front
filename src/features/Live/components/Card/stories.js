import React from 'react';
import dayjs from 'dayjs';
import TestImage from '@/images/TestImage.jpg';
import { DATE_FORMAT } from '@/features/Live/constants';
import LiveCard from './index';

export default {
  title: 'features/Live/LiveCard',
  component: LiveCard,
};

const Template = (args) => (
  <LiveCard {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
  id: 1,
  href: 'https://vk.com/adscreate',
  date: dayjs().format(DATE_FORMAT),
  title: 'Событие 1.',
  content: 'Контент',
  image: TestImage,
  platform: 'vk',
  placement: 'promotedPost',
  device: 'mobile',
};
