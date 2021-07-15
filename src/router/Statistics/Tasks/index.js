import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setHeader } from '@/store/ui/actions';

const propTypes = {
  defaultTitle: PropTypes.string,
};

const defaultProps = {
  defaultTitle: '',
};

const StatisticsTasks = function StatisticsTaskScreen({ defaultTitle }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeader(defaultTitle));
  }, [dispatch, defaultTitle]);

  return (
    <div>
      Задачи
    </div>
  );
};

StatisticsTasks.propTypes = propTypes;
StatisticsTasks.defaultProps = defaultProps;

export default StatisticsTasks;
