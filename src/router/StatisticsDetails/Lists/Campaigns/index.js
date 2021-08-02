import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import { useService } from '@/hooks';
import WidthSpinner from '@/components/WithSpinner';
import ErrorMessageBlock from '@/components/ErrorMessageBlock';
import Header from '../components/Header';
import FilterRow from '../components/FilterRow';
import TableRow from '../components/TableRow';
import EmptyTableRow from '../components/EmptyTableRow';
import service from '../service';
import styles from '../styles.module.scss';

const countOptions = [10, 20, 30];

const propTypes = {
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
};

const StatisticsСampaigns = function StatisticsСampaignsScreen({
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
    service: service.fetchСampaigns,
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
              dateStart={dateStart}
              dateEnd={dateEnd}
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

StatisticsСampaigns.propTypes = propTypes;

export default StatisticsСampaigns;
