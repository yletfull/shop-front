import React from 'react';
import Pagination from './index';

export default {
  title: 'Components/Pagination',
  component: Pagination,
};

export const Playground = (args) => (
  <Pagination {...args} />
);

Playground.args = {
  pagesTotal: 10,
  currentPage: 1,
  count: 10,
  countOptions: [10, 20],
  onPageSelect: () => {},
  onCountSelect: () => {},
};
