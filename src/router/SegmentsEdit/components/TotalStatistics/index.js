import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from '@/utils/format';
import IconSync from '@/icons/Sync';
import Spinner from '@/components/Spinner';
import { mapStatisticsEntities } from '../../utils';
import styles from './styles.module.scss';

const propTypes = {
  isFetching: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      entityType: PropTypes.oneOf(['EMAIL', 'PHONE']),
      total: PropTypes.number,
    }),
  ).isRequired,
  error: PropTypes.objectOf(PropTypes.any),
  onRetry: PropTypes.func,
};
const defaultProps = {
  isFetching: false,
  error: null,
  onRetry: () => {},
};

const getErrorMessage = (error) => (
  [
    'Ошибка',
    error?.response?.status || error.message,
  ].join(': ')
);

const TotalStatistics = function SegmentsTotalStatistics({
  isFetching,
  data,
  error,
  onRetry,
}) {
  const canRetry = typeof onRetry === 'function';
  const handleRetryClick = () => {
    if (canRetry) {
      onRetry();
    }
  };

  const entities = mapStatisticsEntities(data);

  return (
    <div className={styles.wrapper}>
      {isFetching && (
        <Spinner
          layout="overlay"
          className={styles.spinner}
        />
      )}

      {Boolean(error) && (
        <div className={styles.error}>
          {Boolean(error) && (
            <div className={styles.errorMessage}>
              {getErrorMessage(error)}
            </div>
          )}
          <button
            type="button"
            className={styles.errorReload}
            onClick={handleRetryClick}
          >
            <IconSync />
          </button>
        </div>
      )}

      <div className={styles.entity}>
        <span className={styles.entityLabel}>
          E-mail
        </span>
        <span className={styles.entityCount}>
          {formatNumber(entities.email)}
        </span>
      </div>
      <div className={styles.entity}>
        <span className={styles.entityLabel}>
          Телефонов
        </span>
        <span className={styles.entityCount}>
          {formatNumber(entities.phone)}
        </span>
      </div>
    </div>
  );
};

TotalStatistics.propTypes = propTypes;
TotalStatistics.defaultProps = defaultProps;

export default TotalStatistics;
