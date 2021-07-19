import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { formatDate } from '@/utils/format';
import { setHeader } from '@/store/ui/actions';
import dayjs from '@/utils/day';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import { useService, useQuery } from '@/hooks';
import Header from '../components/Header';
import WidthSpinner from '../components/WithSpinner';
import TableRow from '../components/TableRow';
import service from '../service';

const DATE_FORMAT = 'YYYY-MM-DD';
const countOptions = [10, 20, 30];

const propTypes = {
  defaultTitle: PropTypes.string,
};

const defaultProps = {
  defaultTitle: '',
};

const StatisticsTasks = function StatisticsTaskScreen({ defaultTitle }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();

  const [params, setParams] = useState({
    dateStart: query.get('dateStart') || formatDate(dayjs().subtract(6, 'month'), DATE_FORMAT),
    dateEnd: query.get('dateEnd') || formatDate(dayjs(), DATE_FORMAT),
    currentPage: query.get('currentPage') || 1,
    perPage: query.get('perPage') || countOptions[0],
  });

  const { fetch, data: response, isFetching } = useService({
    initialData: {},
    service: service.fetchСampaigns,
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
      {meta?.pagination && (
        <Pagination
          pagesTotal={meta.pagination.totalPages}
          currentPage={meta.pagination.currentPage}
          count={meta.pagination.perPage}
          countOptions={countOptions}
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
