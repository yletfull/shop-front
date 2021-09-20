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
  colors: PropTypes.objectOf(PropTypes.string),
};

const defaultProps = {
  colors: {},
};

const ReactionsComments = function ReactionsComments({
  dateStart,
  dateEnd,
  colors,
}) {
  const { entityType, id: entityId } = useParams();

  const { fetch, data, isFetching, error } = useService({
    initialData: {},
    service: service.fetchReactionsComments,
  });

  useEffect(() => {
    if (!dateStart || !dateEnd) {
      return;
    }
    fetch(
      {
        entityType,
        entityId,
        params: { dateStart, dateEnd },
      }
    );
  }, [fetch, dateStart, dateEnd, entityType, entityId]);

  const chartData = useMemo(() => {
    if (!data) {
      return ([]);
    }
    return Object.keys(data).map((date) => ({ ...data[date], date }));
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
            colors={colors}
          />
        )}
      </WithSpinner>
    </div>
  );
};

ReactionsComments.propTypes = propTypes;
ReactionsComments.defaultProps = defaultProps;

export default ReactionsComments;
