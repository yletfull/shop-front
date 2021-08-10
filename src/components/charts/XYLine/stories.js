import React from 'react';
import ChartLine from './index';

export default {
  title: 'Components/ChartLine',
  component: ChartLine,
  argTypes: {
  },
};

const Template = (args) => (
  <ChartLine {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
};
