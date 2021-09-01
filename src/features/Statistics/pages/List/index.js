import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useService, useQueryParams } from '@/hooks';
import WidthSpinner from '@/components/WithSpinner';
import ErrorMessageBlock from '@/components/ErrorMessageBlock';
import List from '@/features/Statistics/components/List';
import { entities } from '@/features/Statistics/constants';
import service from '@/features/Statistics/service';
import styles from './styles.module.scss';

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      entity: PropTypes.oneOf(Object.values(entities)).isRequired,
    }).isRequired,
  }).isRequired,
};

const countOptions = [10, 20, 30];

const StatisticsList = function StatisticsListScreen({
  match,
}) {
  const [queryParams, setQueryParams] = useQueryParams();
  const [filter, setFilter] = useState({ search: queryParams.search || '' });

  const { fetch, data: response, isFetching, error } = useService({
    initialData: {},
    service: service.fetchList,
  });

  const handlePageSelect = (currentPage) => setQueryParams({ currentPage });
  const handleCountSelect = (perPage) => {
    setQueryParams({
      perPage,
      currentPage: 1,
    });
  };
  const handleFormSubmit = ({ search }) => {
    setQueryParams({
      search,
      currentPage: 1,
    });
  };
  const handleSortChange = ({ sortDir, sortField }) => {
    setQueryParams({ sortDir, sortField });
  };

  const handleFilterChange = (values) => {
    setFilter(values);
  };

  const { entity } = match?.params || {};
  const {
    dateStart,
    dateEnd,
    search,
    sortDir,
    sortField,
    currentPage,
    perPage,
  } = queryParams;
  useEffect(() => {
    if (!entity || !dateStart || !dateEnd) {
      return;
    }

    fetch({
      entity,
      dateStart,
      dateEnd,
      search,
      sortDir: sortDir || 'desc',
      sortField: sortField || 'impressions',
      currentPage: currentPage || 1,
      perPage: perPage || countOptions[0],
    });
  }, [
    entity,
    fetch,
    dateStart,
    dateEnd,
    search,
    sortDir,
    sortField,
    currentPage,
    perPage,
  ]);

  const { data, meta } = response || {};

  const list = data || null;

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
      <List
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

StatisticsList.propTypes = propTypes;

export default StatisticsList;
