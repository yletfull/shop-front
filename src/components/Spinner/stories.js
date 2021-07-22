import React from 'react';
import Spinner from './index';

export default {
  title: 'Components/Spinner',
  component: Spinner,
};

const Template = (args) => (
  <Spinner {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
};
