import React from 'react';
import TableView from './index';

export default {
  title: 'Components/TableView',
  component: TableView,
};

const Template = (args) => (
  <TableView {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
};
