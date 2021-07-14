import React from 'react';
import IconChevronLeft from '@/icons/ChevronLeft';
import IconChevronRight from '@/icons/ChevronRight';
import NumberGrowth from './index';

export default {
  title: 'Components/NumberGrowth',
  component: NumberGrowth,
};

const Template = (args) => (
  <NumberGrowth {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  value: 15,
  renderZero: true,
  formatter: Math.abs,
  increaseSign: <IconChevronLeft />,
  decreaseSign: <IconChevronRight />,
};
