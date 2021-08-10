import React from 'react';
import SortButton from './index';

export default {
  title: 'Components/SortButton',
  component: SortButton,
};

export const Playground = (args) => (
  <SortButton {...args} />
);

Playground.args = {
  children: 'Показатель',
  isActive: false,
  field: 'index',
  direction: 'asc',
};
