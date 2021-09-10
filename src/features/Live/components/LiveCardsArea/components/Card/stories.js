import React from 'react';
import LiveCard from './index';

export default {
  title: 'Live/LiveCard',
  component: LiveCard,
};

const Template = (args) => (
  <LiveCard {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
};
