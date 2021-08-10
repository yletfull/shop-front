import React from 'react';
import Controls from './index';

export default {
  title: 'Components/Controls',
  component: Controls,
};

const Template = (args) => (
  <Controls {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
};
