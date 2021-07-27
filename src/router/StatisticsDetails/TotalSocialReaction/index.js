import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useService } from '@/hooks';
import WithSpinner from '../components/WithSpinner';
import ErrorMessage from '../components/ErrorMessage';
import service from '../service';
import Chart from './Chart';
import styles from './styles.module.scss';

const propTypes = {
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
};

const defaultProps = {};

const TotalSocialReaction = function TotalSocialReaction({
  dateStart,
  dateEnd,
}) {
  const { entityType, id: entityId } = useParams();

  const { fetch, data, isFetching, error } = useService({
    initialData: {},
    service: service.fetchTotalSocialReaction,
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

  console.log(data);

  const chartData = useMemo(() => {
    if (!data) {
      return ([]);
    }
    return Object.keys(data).map((date) => ({ value: data[date], date }));
  }, [data]);

  console.log(chartData);

  return (
    <div className={styles.reactionsComments}>
      <WithSpinner
        layout="overlay"
        isFetching={isFetching}
        className={styles.spinnerOverlay}
      >
        {error
          ? <ErrorMessage error={error} />
          : (
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

TotalSocialReaction.propTypes = propTypes;
TotalSocialReaction.defaultProps = defaultProps;

export default TotalSocialReaction;
