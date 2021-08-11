import React from 'react';
import New from './index';

export default {
  title: 'Components/New',
  component: New,
};

const Template = (args) => (
  <New {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
};
