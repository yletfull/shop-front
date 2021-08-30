import React from 'react';
import Table from '@/components/Table';
import EmptyTableRow from './index';

export default {
  title: 'Features/Statistics/components/EmptyTableRow',
  component: EmptyTableRow,
};

export const Playground = (args) => (
  <Table>
    <EmptyTableRow {...args} />
  </Table>
);
