import React from 'react';
import Table, { TableRow, TableCell } from './index';

export default {
  title: 'Components/Table',
  component: Table,
};

const Template = (args) => (
  <Table {...args}>
    <TableRow type="header">
      <TableCell>
        Title
      </TableCell>
      <TableCell>
        Value
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        Economics
      </TableCell>
      <TableCell>
        42 553
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        Politics
      </TableCell>
      <TableCell>
        35 379
      </TableCell>
    </TableRow>
  </Table>
);

export const Playground = Template.bind({});
Playground.args = {
};
