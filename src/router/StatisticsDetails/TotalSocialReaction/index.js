import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useService, useElementSize } from '@/hooks';
import WithSpinner from '../components/WithSpinner';
import ErrorMessage from '../components/ErrorMessage';
import service from '../service';
import styles from './styles.module.scss';
import Chart from './Chart';

const propTypes = {
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
};

const defaultProps = {};

const TotalSocialReaction = function TotalSocialReaction({
  dateStart,
  dateEnd,
}) {
  const chartRef = useRef(null);
  const [width, height] = useElementSize(chartRef);

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

  return (
    <div className={styles.reactionsComments}>
      <div
        ref={chartRef}
        className={styles.reactionsCommentsChart}
      >
        <WithSpinner
          layout="overlay"
          isFetching={isFetching}
          className={styles.spinnerOverlay}
        >
          {error
            ? <ErrorMessage error={error} />
            : (
              <Chart
                data={data}
                dateStart={dateStart}
                dateEnd={dateEnd}
                width={width}
                height={height}
              />
            )}
        </WithSpinner>
      </div>
    </div>
  );
};

TotalSocialReaction.propTypes = propTypes;
TotalSocialReaction.defaultProps = defaultProps;

export default TotalSocialReaction;
