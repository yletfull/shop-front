import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useService } from '@/hooks';
import WithSpinner from '@/components/WithSpinner';
import ErrorMessageBlock from '@/components/ErrorMessageBlock';
import service from '../../service';
import Chart from './Chart';
import styles from './styles.module.scss';

const propTypes = {
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
};

const defaultProps = {};

const ReactionsTotal = function ReactionsTotal({
  dateStart,
  dateEnd,
}) {
  const { entityType, entityId } = useParams();

  const { fetch, data, isFetching, error } = useService({
    initialData: {},
    service: service.fetchReactionsTotal,
  });

  useEffect(() => {
    if (!dateStart || !dateEnd) {
      return;
    }
    const params = { dateStart, dateEnd };
    fetch({ entityType, entityId, params });
  }, [fetch, dateStart, dateEnd, entityType, entityId]);

  const chartData = useMemo(() => {
    if (!data) {
      return ([]);
    }
    return Object.keys(data).map((date) => ({ date, value: data[date] }));
  }, [data]);

  return (
    <div className={styles.wrapper}>
      <WithSpinner
        layout="block"
        isFetching={isFetching}
      >
        {error && (
          <ErrorMessageBlock error={error} />
        )}
        {Boolean(!chartData?.length) && (
          <span>
            Нет данных за период
          </span>
        )}
        {Boolean(chartData?.length) && (!error && data) && (
          <Chart
            data={chartData}
            dateStart={dateStart}
            dateEnd={dateEnd}
          />
        )}
      </WithSpinner>
    </div>
  );
};

ReactionsTotal.propTypes = propTypes;
ReactionsTotal.defaultProps = defaultProps;

export default ReactionsTotal;
