import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell } from '@/components/Table';
import styles from './styles.module.scss';

const propTypes = {
  colSpan: PropTypes.number.isRequired,
};

const StatisticsTableRow = function StatisticsTableRow({
  colSpan,
}) {
  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        className={styles.empty}
        align="center"
      >
        Список пуст
      </TableCell>
    </TableRow>
  );
};

StatisticsTableRow.propTypes = propTypes;

export default StatisticsTableRow;
