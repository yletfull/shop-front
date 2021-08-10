import React from 'react';
import RolesList from './index';

export default {
  title: 'Components/RolesList',
  component: RolesList,
};

const Template = (args) => (
  <RolesList {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
};
