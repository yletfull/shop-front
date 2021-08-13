import React from 'react';
import Details from './index';

export default {
  title: 'Components/Details',
  component: Details,
};

const Template = (args) => (
  <Details {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
};
