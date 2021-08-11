import React from 'react';
import AddPermissionsForm from './index';

export default {
  title: 'Components/AddPermissionsForm',
  component: AddPermissionsForm,
};

const Template = (args) => (
  <AddPermissionsForm {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
};
