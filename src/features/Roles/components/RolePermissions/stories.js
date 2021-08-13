import React from 'react';
import RolePermissions from './index';

export default {
  title: 'Components/RolePermissions',
  component: RolePermissions,
};

const Template = (args) => (
  <RolePermissions {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
};
