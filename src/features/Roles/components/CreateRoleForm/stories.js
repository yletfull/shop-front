import React from 'react';
import CreateRoleForm from './index';

export default {
  title: 'Components/CreateRoleForm',
  component: CreateRoleForm,
};

const Template = (args) => (
  <CreateRoleForm {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
};
