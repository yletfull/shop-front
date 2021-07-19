import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { formatDate } from '@/utils/format';
import dayjs from '@/utils/day';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import { useService, useQuery } from '@/hooks';
import ErrorMessage from '../components/ErrorMessage';
import Header from '../components/Header';
import WidthSpinner from '../components/WithSpinner';
import TableRow from '../components/TableRow';
import service from '../service';

const DATE_FORMAT = 'YYYY-MM-DD';
const countOptions = [10, 20, 30];

const StatisticsTasks = function StatisticsTaskScreen() {
  const history = useHistory();
  const query = useQuery();

  const [params, setParams] = useState({
    dateStart: query.get('dateStart') || formatDate(dayjs().subtract(6, 'month'), DATE_FORMAT),
    dateEnd: query.get('dateEnd') || formatDate(dayjs(), DATE_FORMAT),
    currentPage: query.get('currentPage') || 1,
    perPage: query.get('perPage') || countOptions[0],
  });

  const { fetch, data: response, isFetching, error } = useService({
    initialData: {},
    service: service.fetchPlatforms,
  });

  const handlePageSelect = (value) => {
    setParams({
      ...params,
      currentPage: value,
    });
    query.set('currentPage', value);
    history.push({ search: query.toString() });
  };

  const handleCountSelect = (value) => {
    setParams({
      ...params,
      currentPage: 1,
      perPage: value,
    });
    query.set('perPage', value);
    history.push({ search: query.toString() });
  };

  useEffect(() => {
    fetch(params);
  }, [fetch, params]);

  const { data, meta } = response?.data || {};

  const list = data || [];

  return (
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
  );
};

export default StatisticsTasks;
