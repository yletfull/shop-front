import React, { useEffect, useState, Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import { useService } from '@/hooks';
import ErrorMessage from '../components/ErrorMessage';
import Header from '../components/Header';
import WidthSpinner from '../components/WithSpinner';
import FilterRow from '../components/FilterRow';
import TableRow from '../components/TableRow';
import EmptyTableRow from '../components/EmptyTableRow';
import service from '../service';
import styles from '../styles.module.scss';

const countOptions = [10, 20, 30];

const StatisticsСampaigns = function StatisticsСampaignsScreen() {
  const history = useHistory();
  const locationSearch = useLocation().search;
  const query = new URLSearchParams(locationSearch);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    query.set('search', filter.search);
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
              <Header
                sortDir={meta?.sort?.sortDir}
                sortField={meta?.sort?.sortField}
                onSortChange={handleSortChange}
              />
            </Fragment>
          )}
        >
          {list.map((item) => (
            <TableRow
              key={item.id}
              entity="campaigns"
              id={item.id}
              index={item.index}
              indexDiff={item.indexDiff}
              name={item.name}
              impressions={item.impressions}
              clicks={item.clicks}
              ctr={item.ctr}
              positiveReactions={item.positiveReactions}
              negativeReactions={item.negativeReactions}
              repostsReactions={item.repostsReactions}
              totalReactions={item.totalReactions}
            />
          ))}
          {(!isFetching && list.length === 0) && (
            <EmptyTableRow colSpan={17} />
          )}
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

export default StatisticsСampaigns;
