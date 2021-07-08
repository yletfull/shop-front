import React from 'react';
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
