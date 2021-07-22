import React from 'react';
import PropTypes from 'prop-types';
// import { formatDate, formatNumber } from '@/utils/format';
import Table, { TableRow, TableCell } from '@/components/Table';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
};
const defaultProps = {
  data: [],
};

const Segments = function Segments({
  data,
}) {
  console.log(data);

  return (
    <div className={styles.segments}>
      <Table>
        <TableRow type="header">
          <TableCell>
            ID
          </TableCell>
          <TableCell>
            Название
          </TableCell>
          <TableCell>
            Телеф.
          </TableCell>
          <TableCell>
            E-mail
          </TableCell>
          <TableCell>
            Файлы
          </TableCell>
          <TableCell>
            Посл. версия
          </TableCell>
        </TableRow>
      </Table>
    </div>
  );
};

Segments.propTypes = propTypes;
Segments.defaultProps = defaultProps;

export default Segments;
