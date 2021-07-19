import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell } from '@/components/Table';
import Input from '@/components/Input';
import Button from '@/components/Button';
import styles from './styles.module.scss';

const propTypes = {
  onButtonClick: PropTypes.func.isRequired,
};

const StatisticsTableRow = function StatisticsTableRow({
  onButtonClick,
}) {
  return (
    <TableRow>
      <TableCell
        colspan="17"
        className={styles.filter}
      >
        <div
          className={styles.wrapper}
        >
          <Input
            name="search"
            type="text"
            fullWidth
          />
          <Button
            onClick={onButtonClick}
          >
            найти
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

StatisticsTableRow.propTypes = propTypes;

export default StatisticsTableRow;
