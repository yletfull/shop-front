import React from 'react';
import EditPermissions from './index';

export default {
  title: 'Components/EditPermissions',
  component: EditPermissions,
};

const Template = (args) => (
  <EditPermissions {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
};
