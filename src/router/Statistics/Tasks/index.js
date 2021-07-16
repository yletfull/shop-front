import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { formatDate } from '@/utils/format';
import { setHeader } from '@/store/ui/actions';
import dayjs from '@/utils/day';
import Table from '@/components/Table';
import Header from '../components/Header';
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

  const { list, isFetching, error } = useFetch({
    entity: 'tasks',
    preventRequest: false,
    dateStart: formatDate(dayjs().subtract(6, 'month'), DATE_FORMAT),
    dateEnd: formatDate(dayjs(), DATE_FORMAT),
  });

  console.log({ isFetching, error });

  useEffect(() => {
    dispatch(setHeader(defaultTitle));
  }, [dispatch, defaultTitle]);

  return (
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
  );
};

StatisticsTasks.propTypes = propTypes;
StatisticsTasks.defaultProps = defaultProps;

export default StatisticsTasks;
