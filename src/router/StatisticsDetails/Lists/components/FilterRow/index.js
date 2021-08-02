import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell } from '@/components/Table';
import Input from '@/components/Input';
import Button from '@/components/Button';
import styles from './styles.module.scss';

const propTypes = {
  values: PropTypes.objectOf(
    PropTypes.any
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

const StatisticsFilterRow = function StatisticsFilterRow({
  values,
  onChange,
}) {
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...values,
      [name]: value,
    });
  };

  return (
    <TableRow>
      <TableCell
        colSpan="17"
        className={styles.filter}
      >
        <div
          className={styles.wrapper}
        >
          <Input
            className={styles.input}
            value={values.search || ''}
            placeholder="Название"
            name="search"
            type="text"
            onChange={handleSearchChange}
          />
          <Button
            type="submit"
          >
            найти
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

StatisticsFilterRow.propTypes = propTypes;

export default StatisticsFilterRow;