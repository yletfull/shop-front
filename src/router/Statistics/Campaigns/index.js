import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import StatisticsList from '@/features/Statistics/components/List';
import { useService } from '@/hooks';
import WidthSpinner from '@/components/WithSpinner';
import ErrorMessageBlock from '@/components/ErrorMessageBlock';
import service from '../service';
import styles from '../styles.module.scss';

const countOptions = [10, 20, 30];

const StatisticsСampaigns = function StatisticsСampaignsScreen() {
  const history = useHistory();
  const locationSearch = useLocation().search;
  const query = new URLSearchParams(locationSearch);

  const dateStart = query.get('dateStart');
  const dateEnd = query.get('dateEnd');

  const [filter, setFilter] = useState({ search: query.get('search') });

  const { fetch, data: response, isFetching, error } = useService({
    initialData: {},
    service: service.fetchСampaigns,
  });

  const handlePageSelect = (value) => {
    query.set('currentPage', value);
    history.push({ search: query.toString() });
  };

  const handleCountSelect = (value) => {
    query.set('currentPage', 1);
    query.set('perPage', value);
    history.push({ search: query.toString() });
  };

  const handleFormSubmit = (values) => {
    query.set('currentPage', 1);
    query.set('search', values.search);
    history.push({ search: query.toString() });
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
    if (!locationSearch) {
      return;
    }
    const newQuery = new URLSearchParams(locationSearch);
    const params = {
      currentPage: newQuery.get('currentPage') || 1,
      perPage: newQuery.get('perPage') || countOptions[0],
      sortDir: newQuery.get('sortDir'),
      sortField: newQuery.get('sortField'),
      search: newQuery.get('search'),
      dateStart: newQuery.get('dateStart'),
      dateEnd: newQuery.get('dateEnd'),
    };
    fetch(params);
  }, [locationSearch, fetch]);

  const { data, meta } = response?.data || {};

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
      <StatisticsList
        dateStart={dateStart}
        dateEnd={dateEnd}
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

export default StatisticsСampaigns;
