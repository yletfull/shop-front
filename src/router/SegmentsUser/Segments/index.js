import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@/hooks';
import { formatDate, formatNumber } from '@/utils/format';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Pagination from '@/components/PagePagination';
import Spinner from '@/components/Spinner';
import Table, { TableRow, TableCell } from '@/components/Table';
import { queryParams } from '../constants';
import {
  getIsFetchingSegments,
  getSegmentsData,
  getSegmentsMeta,
} from '../selectors';
import styles from './styles.module.scss';

const propTypes = {
  onChangePage: PropTypes.func,
};
const defaultProps = {
  onChangePage: () => {},
};

const Segments = function Segments({
  onChangePage,
}) {
  const history = useHistory();
  const query = useQuery();

  const isFetching = useSelector(getIsFetchingSegments);
  const data = useSelector(getSegmentsData);
  const { pagination } = useSelector(getSegmentsMeta);

  const isEmpty = !isFetching && (!data || data.length === 0);
  const hasData = !isFetching && Array.isArray(data) && data.length > 0;

  const [values, setValues] = useState({
    [queryParams.segmentId]: query.get(queryParams.segmentId) || '',
    [queryParams.segmentName]: query.get(queryParams.segmentName) || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e?.target || {};
    if (!name) {
      return;
    }
    setValues({ ...values, [name]: value });
  };

  const handleChangePage = (page) => {
    if (!page) {
      return;
    }
    query.set(queryParams.page, page);
    history.push({ search: query.toString() });
    onChangePage(page);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    query.set(queryParams.segmentId, values[queryParams.segmentId] || '');
    query.set(queryParams.segmentName, values[queryParams.segmentName] || '');
    history.push({ search: query.toString() });
  };

  return (
    <div className={styles.segments}>
      <form onSubmit={handleFormSubmit}>
        <Table className={styles.segmentsTable}>
          <TableRow>
            <TableCell data-type="filter">
              <Input
                placeholder="ID"
                name={queryParams.segmentId}
                value={values[queryParams.segmentId]}
                onChange={handleInputChange}
                fullwidth
              />
            </TableCell>
            <TableCell
              colSpan="5"
              data-type="filter"
            >
              <span className={styles.segmentsFilterCell}>
                <Input
                  placeholder="Название"
                  name={queryParams.segmentName}
                  value={values[queryParams.segmentName]}
                  onChange={handleInputChange}
                />
                <Button type="submit">
                  найти
                </Button>
              </span>
            </TableCell>
          </TableRow>

          <TableRow type="header">
            <TableCell>
              ID
            </TableCell>
            <TableCell>
              Название
            </TableCell>
            <TableCell align="right">
              Телеф.
            </TableCell>
            <TableCell align="right">
              E-mail
            </TableCell>
            <TableCell>
              Файлы
            </TableCell>
            <TableCell align="right">
              Посл. версия
            </TableCell>
          </TableRow>

          {isFetching && (
            <TableRow>
              <TableCell colSpan="6">
                <Spinner />
              </TableCell>
            </TableRow>
          )}

          {isEmpty && (
            <TableRow>
              <TableCell colSpan="6">
                Нет данных
              </TableCell>
            </TableRow>
          )}

          {hasData && data.map((d) => (
            <TableRow key={d.id}>
              <TableCell>
                {d.id}
              </TableCell>
              <TableCell>
                {d.title}
              </TableCell>
              <TableCell align="right">
                {d.phones ? formatNumber(d.phones) : '-'}
              </TableCell>
              <TableCell align="right">
                {d.emails ? formatNumber(d.emails) : '-'}
              </TableCell>
              <TableCell />
              <TableCell align="right">
                {formatDate(d.lastVersionDate)}
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </form>

      {pagination && (
        <Pagination
          isDisabled={isFetching}
          page={pagination.currentPage || 1}
          numberOfPages={pagination.totalPages || 1}
          onChangePage={handleChangePage}
        />
      )}
    </div>
  );
};

Segments.propTypes = propTypes;
Segments.defaultProps = defaultProps;

export default Segments;
