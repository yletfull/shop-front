import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import { formatDate } from '@/utils/format';
import Table, { TableCell, TableRow } from '@/components/Table';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    createdAt: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.string,
    login: PropTypes.string,
    phone: PropTypes.string,
    updatedAt: PropTypes.string,
  })),
};

const defaultProps = {
  data: [],
};

const TableView = function TableView({ data }) {
  const { url } = useRouteMatch();

  const dateFormat = 'YYYY:MM:DD HH:mm:ss';
  const getShortId = (id) => id.slice(0, 8);

  return (
    <div className={styles.tableView}>
      <Table>
        <TableRow type="header">
          <TableCell>
            ID
          </TableCell>
          <TableCell>
            Логин
          </TableCell>
          <TableCell>
            E-mail
          </TableCell>
          <TableCell>
            Телефон
          </TableCell>
          <TableCell align="right">
            Дата создания
          </TableCell>
          <TableCell align="right">
            Дата обновления
          </TableCell>
        </TableRow>

        {data.length === 0 && (
          <TableRow>
            <TableCell
              colSpan="6"
              align="center"
            >
              Нет данных
            </TableCell>
          </TableRow>
        )}

        {data.map((row) => (
          <TableRow key={row.id || row.email}>
            <TableCell>
              {!row.id && '-'}
              {row.id && (
                <Link
                  to={`${url}/details/${row.id}`}
                  title={row.id}
                >
                  {getShortId(row.id)}
                </Link>
              )}
            </TableCell>
            <TableCell>
              {row.login || '-'}
            </TableCell>
            <TableCell>
              {row.email || '-'}
            </TableCell>
            <TableCell>
              {row.phone || '-'}
            </TableCell>
            <TableCell align="right">
              {!row.createdAt && '-'}
              {row.createdAt && formatDate(row.createdAt, dateFormat)}
            </TableCell>
            <TableCell align="right">
              {!row.uploadAt && '-'}
              {row.uploadAt && formatDate(row.uploadAt, dateFormat)}
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
