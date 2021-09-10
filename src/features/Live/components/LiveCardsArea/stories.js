import React from 'react';
import LiveCardsArea from './index';

export default {
  title: 'Live/LiveCardsArea',
  component: LiveCardsArea,
};

const Template = (args) => (
  <LiveCardsArea {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
};
