import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { formatDate } from '@/utils/format';
import { setHeader } from '@/store/ui/actions';
import dayjs from '@/utils/day';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import Header from '../components/Header';
import WidthSpinner from '../components/WithSpinner';
import TableRow from '../components/TableRow';
import useFetch from '../hooks/use-fetch';

const DATE_FORMAT = 'YYYY-MM-DD';

const propTypes = {
  defaultTitle: PropTypes.string,
};

const defaultProps = {
  defaultTitle: '',
};

const StatisticsTasks = function StatisticsTaskScreen({ defaultTitle }) {
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({});

  const handlePageSelect = (value) => setPagination({
    ...pagination,
    currentPage: value,
  });

  const handleCountSelect = (value) => setPagination({
    ...pagination,
    perPage: value,
  });

  const { data, isFetching, error } = useFetch({
    entity: 'tasks',
    preventRequest: false,
    dateStart: formatDate(dayjs().subtract(6, 'month'), DATE_FORMAT),
    dateEnd: formatDate(dayjs(), DATE_FORMAT),
  });

  const list = data.data || [];
  // const { pagination } = data.meta || {};

  console.log({ error });

  useEffect(() => {
    dispatch(setHeader(defaultTitle));
  }, [dispatch, defaultTitle]);

  return (
    <WidthSpinner
      isFetching={isFetching}
    >
      <Table
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
      </Table>
      {pagination && (
        <Pagination
          pagesTotal={pagination.totalPages}
          currentPage={pagination.currentPage}
          count={pagination.perPage}
          countOptions={[10, 20, 30]}
          onPageSelect={handlePageSelect}
          onCountSelect={handleCountSelect}
        />
      )}
    </WidthSpinner>
  );
};

StatisticsTasks.propTypes = propTypes;
StatisticsTasks.defaultProps = defaultProps;

export default StatisticsTasks;
