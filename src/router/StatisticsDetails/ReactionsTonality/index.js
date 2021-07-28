import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useService } from '@/hooks';
import { colors } from '../constants';
import WithSpinner from '../components/WithSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Chart from './Chart';
import service from './service';
import styles from './styles.module.scss';

const propTypes = {
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
};

const defaultProps = {};

const ReactionsTonality = function ReactionsTonality({
  dateStart,
  dateEnd,
}) {
  const { entityType, id: entityId } = useParams();

  const { fetch, data, isFetching, error } = useService({
    initialData: {},
    service: service.fetchReactionsTonality,
  });

  useEffect(() => {
    if (!dateStart || !dateEnd) {
      return;
    }
    const params = { dateStart, dateEnd };
    fetch({ entityType, entityId, params });
  }, [fetch, dateStart, dateEnd, entityType, entityId]);

  const chartData = useMemo(() => {
    if (!data || Object.keys(data).length === 0) {
      return [];
    }
    return Object.keys(data).map((key) => ({
      ...data[key],
      date: data[key]?.date || key,
    }));
  }, [data]);
  const chartMeta = useMemo(() => {
    if (!data || Object.keys(data).length === 0) {
      return ({
        maxNegative: 0,
        maxPositive: 0,
      });
    }
    return ({
      maxNegative: Math.max(...Object.values(data)
        .map((values) => values.negative || 0)),
      maxPositive: Math.max(...Object.values(data)
        .map((values) => values.positive || 0)),
    });
  }, [data]);

  return (
    <div className={styles.reactionsTonality}>
      <WithSpinner
        layout="overlay"
        isFetching={isFetching}
        className={styles.spinnerOverlay}
      >
        {error && (
          <ErrorMessage error={error} />
        )}
        {!error && data && (
          <Chart
            data={chartData}
            meta={chartMeta}
            dateStart={dateStart}
            dateEnd={dateEnd}
            colors={colors}
          />
        )}
      </WithSpinner>
    </div>
  );
};

ReactionsTonality.propTypes = propTypes;
ReactionsTonality.defaultProps = defaultProps;

export default ReactionsTonality;
