import React from 'react';
import RolePermissionsForm from './index';

export default {
  title: 'Components/RolePermissionsForm',
  component: RolePermissionsForm,
};

const Template = (args) => (
  <RolePermissionsForm {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
};
