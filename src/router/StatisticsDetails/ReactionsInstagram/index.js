import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useService } from '@/hooks';
import NumberGrowth from '@/components/NumberGrowth';
import ErrorMessage from '../components/ErrorMessage';
import WithSpinner from '../components/WithSpinner';
import service from '../service';
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
  const { entityType, id: entityId } = useParams();

  const { fetch, data, isFetching, error } = useService({
    initialData: {},
    service: service.fetchReactionsByPlatform,
  });

  const { total = {} } = data;

  useEffect(() => {
    if (!dateStart || !dateEnd) {
      return;
    }
    const params = { dateStart, dateEnd };
    fetch({
      platformId: 'ig',
      entityType,
      entityId,
      params,
    });
  }, [fetch, dateStart, dateEnd, entityType, entityId]);

  const chartData = useMemo(() => {
    const { dynamics } = data;
    if (!dynamics) {
      return ([]);
    }
    return Object.keys(dynamics)
      .map((date) => ({ date, value: data[date] }));
  }, [data]);

  return (
    <div className={styles.reactionsTotal}>
      <WithSpinner
        layout="overlay"
        isFetching={isFetching}
        className={styles.reactionsTotalSpinner}
      >
        {error
          ? <ErrorMessage error={error} />
          : (
            <div>
              <Chart
                data={chartData}
                dateStart={dateStart}
                dateEnd={dateEnd}
              />
              <div className={styles.summary}>
                <div>
                  Реакций за период
                  <span className={styles.summary_indicator} />
                </div>
                <div
                  className={styles.total}
                >
                  <span
                    className={styles.total_count}
                  >
                    {total.count}
                  </span>
                  <NumberGrowth
                    renderZero
                    value={total.diff}
                  />
                </div>
              </div>
            </div>
          )}
      </WithSpinner>
    </div>
  );
};

ReactionsTotal.propTypes = propTypes;
ReactionsTotal.defaultProps = defaultProps;

export default ReactionsTotal;
