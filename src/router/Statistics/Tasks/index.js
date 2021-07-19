import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import { useService, useQuery } from '@/hooks';
import ErrorMessage from '../components/ErrorMessage';
import Header from '../components/Header';
import WidthSpinner from '../components/WithSpinner';
import TableRow from '../components/TableRow';
import service from '../service';
import styles from '../styles.module.scss';

const countOptions = [10, 20, 30];

const propTypes = {
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
};

const StatisticsTasks = function StatisticsTaskScreen({
  dateStart,
  dateEnd,
}) {
  const history = useHistory();
  const query = useQuery();

  const [pagination, setPagination] = useState({
    currentPage: query.get('currentPage') || 1,
    perPage: query.get('perPage') || countOptions[0],
  });

  const { fetch, data: response, isFetching, error } = useService({
    initialData: {},
    service: service.fetchTasks,
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
    query.set('perPage', value);
    history.push({ search: query.toString() });
  };

  useEffect(() => {
    fetch({
      ...pagination,
      dateStart,
      dateEnd,
    });
  }, [fetch, pagination, dateStart, dateEnd]);

  const { data, meta } = response?.data || {};

  const list = data || [];

  return (
    <div className={styles.page}>
      <WidthSpinner
        isFetching={isFetching}
      >
        {error
          ? (
            <ErrorMessage
              key="error-message"
              error={error}
            />
          )
          : ([
            <Table
              key="table"
              header={<Header />}
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
                  positiveReactions={item.positiveReactions}
                  negativeReactions={item.negativeReactions}
                  repostsReactions={item.repostsReactions}
                  totalReactions={item.totalReactions}
                />
              ))}
            </Table>,
            meta?.pagination && (
              <Pagination
                key="pagination"
                pagesTotal={meta.pagination.totalPages}
                currentPage={meta.pagination.currentPage}
                count={meta.pagination.perPage}
                countOptions={countOptions}
                onPageSelect={handlePageSelect}
                onCountSelect={handleCountSelect}
              />
            ),
          ])}
      </WidthSpinner>
    </div>
  );
};

StatisticsTasks.propTypes = propTypes;

export default StatisticsTasks;
