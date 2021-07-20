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

const StatisticsTableRow = function StatisticsTableRow({
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
        colSpan="9"
        className={styles.filter}
      >
        <div
          className={styles.wrapper}
        >
          <Input
            className={styles.input}
            value={values.search}
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

StatisticsTableRow.propTypes = propTypes;

export default StatisticsTableRow;
