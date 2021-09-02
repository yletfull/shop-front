import React from 'react';
import SortButton from './index';

export default {
  title: 'Components/SortButton',
  component: SortButton,
};

const Template = (args) => <SortButton {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  children: 'Показатель',
  field: 'index',
  sortField: 'index',
  sortDir: 'asc',
};
