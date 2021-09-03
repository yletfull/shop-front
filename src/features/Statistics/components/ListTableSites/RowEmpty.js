import React from 'react';
import { TableRow, TableCell } from '@/components/Table';
import EmptyState from '@/features/Statistics/components/EmptyState';

const RowEmpty = function ListTableRowEmpty() {
  return (
    <TableRow>
      <TableCell colSpan={9}>
        <EmptyState />
      </TableCell>
    </TableRow>
  );
};

export default RowEmpty;
