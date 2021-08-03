import React from 'react';
import AppMain from './index';

export default {
  title: 'Components/AppMain',
  component: AppMain,
};

const Template = (args) => (
  <AppMain {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
};
