import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { useService } from '@/hooks';
import StatisticsList from '@/features/Statistics/components/List';
import WidthSpinner from '@/components/WithSpinner';
import ErrorMessageBlock from '@/components/ErrorMessageBlock';
import service from '../service';
import styles from '../styles.module.scss';

const countOptions = [10, 20, 30];

const propTypes = {
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
};

const StatisticsTasks = function StatisticsTasksScreen({
  dateStart,
  dateEnd,
}) {
  const history = useHistory();
  const locationSearch = useLocation().search;
  const query = new URLSearchParams(locationSearch);

  const [filter, setFilter] = useState({ search: query.get('search') });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(countOptions[0]);
  const [search, setSearch] = useState('');

  const { fetch, data: response, isFetching, error } = useService({
    initialData: {},
    service: service.fetchTasks,
  });

  const handlePageSelect = (value) => {
    setCurrentPage(value);
  };

  const handleCountSelect = (value) => {
    setCurrentPage(1);
    setPerPage(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSearch(filter.search);
  };

  const handleSortChange = ({ sortDir, sortField }) => {
    query.set('sortDir', sortDir);
    query.set('sortField', sortField);
    history.push({ search: query.toString() });
  };

  const handleFilterChange = (values) => {
    setFilter(values);
  };

  useEffect(() => {
    const newQuery = new URLSearchParams(locationSearch);
    const params = {
      currentPage,
      perPage,
      sortDir: newQuery.get('sortDir'),
      sortField: newQuery.get('sortField'),
      search,
      dateStart,
      dateEnd,
    };
    fetch(params);
  }, [locationSearch, fetch, dateStart, dateEnd, currentPage, perPage, search]);

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
        <ErrorMessageBlock
          key="error-message"
          error={error}
        />
      )}
      <StatisticsList
        dateStart={dateStart}
        dateEnd={dateEnd}
        entity="tasks"
        list={list}
        pagination={meta?.pagination}
        sort={meta?.sort}
        filter={filter}
        onFilterChange={handleFilterChange}
        onPageSelect={handlePageSelect}
        onCountSelect={handleCountSelect}
        onSortChange={handleSortChange}
        onFormSubmit={handleFormSubmit}
      />
    </div>
  );
};

StatisticsTasks.propTypes = propTypes;

export default StatisticsTasks;
