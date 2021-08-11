import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import Table, { TableCell, TableRow } from '@/components/Table';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
};

const defaultProps = {
  data: [],
};

const TableView = function TableView({ data }) {
  const { url } = useRouteMatch();

  const getShortId = (id) => id.slice(0, 8);

  return (
    <div className={styles.tableView}>
      <Table>
        <TableRow type="header">
          <TableCell>
            ID
          </TableCell>
          <TableCell>
            Имя
          </TableCell>
          <TableCell>
            Наименование
          </TableCell>
        </TableRow>

        {data.length === 0 && (
          <TableRow>
            <TableCell
              colSpan="3"
              align="center"
            >
              Нет данных
            </TableCell>
          </TableRow>
        )}

        {data.map((row) => (
          <TableRow key={row.name || row.id}>
            <TableCell>
              {!row.id && '-'}
              {row.id && row.name && (
                <Link
                  to={`${url}/details/${row.name}`}
                  title={row.id}
                >
                  {getShortId(row.id)}
                </Link>
              )}
            </TableCell>
            <TableCell>
              {row.name || '-'}
            </TableCell>
            <TableCell>
              {row.title || '-'}
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  );
};

TableView.propTypes = propTypes;
TableView.defaultProps = defaultProps;

export default TableView;
