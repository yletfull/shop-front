import React from 'react';
import AddRoleForm from './index';

export default {
  title: 'Components/AddRoleForm',
  component: AddRoleForm,
};

const Template = (args) => (
  <AddRoleForm {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
};
