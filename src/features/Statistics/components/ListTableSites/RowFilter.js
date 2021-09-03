import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell } from '@/components/Table';
import Input from '@/components/Input';
import Button from '@/components/Button';
import styles from './styles.module.scss';

const propTypes = {
  search: PropTypes.string,
  onChange: PropTypes.func,
};
const defaultProps = {
  search: '',
  onChange: () => {},
};

const RowFilter = function ListTableSitesRowFilter({
  search,
  onChange,
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    onChange({ [name]: value });
  };

  return (
    <TableRow>
      <TableCell
        colSpan="17"
        className={styles.filter}
      >
        <div className={styles.filterWrapper}>
          <Input
            className={styles.filterInput}
            value={search || ''}
            placeholder="Поиск по названию"
            name="search"
            type="text"
            onChange={handleInputChange}
          />
          <Button type="submit">
            найти
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

RowFilter.propTypes = propTypes;
RowFilter.defaultProps = defaultProps;

export default RowFilter;
