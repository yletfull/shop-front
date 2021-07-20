import React, { useEffect, useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import { useService, useQuery } from '@/hooks';
import ErrorMessage from '../components/ErrorMessage';
import WidthSpinner from '../components/WithSpinner';
import service from '../service';
import styles from '../styles.module.scss';
import Header from './components/Header';
import TableRow from './components/TableRow';
import FilterRow from './components/FilterRow';

const countOptions = [10, 20, 30];

const propTypes = {
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
};

const StatisticsSites = function StatisticsSitesScreen({
  dateStart,
  dateEnd,
}) {
  const history = useHistory();
  const query = useQuery();

  const [pagination, setPagination] = useState({
    currentPage: query.get('currentPage') || 1,
    perPage: query.get('perPage') || countOptions[0],
  });

  const [params, setParams] = useState({
    search: query.get('search') || '',
  });

  const [filter, setFilter] = useState(params);

  const { fetch, data: response, isFetching, error } = useService({
    initialData: {},
    service: service.fetchSites,
  });

  const handlePageSelect = (value) => {
    setPagination({
      ...pagination,
      currentPage: value,
    });
    query.set('currentPage', value);
    history.push({ search: query.toString() });
  };

  const handleCountSelect = (value) => {
    setPagination({
      ...pagination,
      currentPage: 1,
      perPage: value,
    });
    query.set('currentPage', 1);
    query.set('perPage', value);
    history.push({ search: query.toString() });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setParams({
      ...filter,
    });
  };

  const handleFilterChange = (values) => {
    setFilter(values);
  };

  useEffect(() => {
    fetch({
      ...params,
      ...pagination,
      dateStart,
      dateEnd,
    });
  }, [fetch, pagination, dateStart, dateEnd, params]);

  const { data, meta } = response?.data || {};

  const list = data || [];

  return (
    <div className={styles.page}>
      <WidthSpinner
        className={styles.spinnerOverlay}
        layout="overlay"
        isFetching={isFetching}
      />
      {error && (
        <ErrorMessage
          key="error-message"
          error={error}
        />
      )}
      <form
        key="form"
        onSubmit={handleFormSubmit}
      >
        <Table
          header={(
            <Fragment>
              <FilterRow
                values={filter}
                onChange={handleFilterChange}
              />
              <Header />
            </Fragment>
          )}
        >
          {list.map((item) => (
            <TableRow
              key={item.id}
              id={item.id}
              index={item.index}
              indexDiff={item.indexDiff}
              name={item.name}
              impressions={item.impressions}
              clicks={item.clicks}
              ctr={item.ctr}
            />
          ))}
        </Table>
      </form>
      {meta?.pagination && (
        <Pagination
          key="pagination"
          pagesTotal={meta.pagination.totalPages}
          currentPage={meta.pagination.currentPage}
          count={meta.pagination.perPage}
          countOptions={countOptions}
          onPageSelect={handlePageSelect}
          onCountSelect={handleCountSelect}
        />
      )}
    </div>
  );
};

StatisticsSites.propTypes = propTypes;

export default StatisticsSites;
