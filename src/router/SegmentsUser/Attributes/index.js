import React from 'react';
import PropTypes from 'prop-types';
// import { formatDate, formatNumber } from '@/utils/format';
import Table, { TableRow, TableCell } from '@/components/Table';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
};

const defaultProps = {
  data: {},
};

const Attributes = function Attributes({
  data,
}) {
  console.log(data);

  return (
    <div className={styles.attributes}>
      <Table>
        <TableRow type="header">
          <TableCell>
            Наименование
          </TableCell>
          <TableCell>
            Значение
          </TableCell>
          <TableCell>
            Дата
          </TableCell>
        </TableRow>
      </Table>
    </div>
  );
};

Attributes.propTypes = propTypes;
Attributes.defaultProps = defaultProps;

export default Attributes;
