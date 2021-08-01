import React from 'react';
import PropTypes from 'prop-types';
import IconSync from '@/icons/Sync';
import Spinner from '@/components/Spinner';
import { formatNumber } from '@/utils/format';
import styles from './styles.module.scss';

const propTypes = {
  isFetching: PropTypes.bool,
  data: PropTypes.shape({
    phone: PropTypes.number,
    email: PropTypes.number,
  }).isRequired,
  error: PropTypes.objectOf(PropTypes.any),
  onReload: PropTypes.func,
};
const defaultProps = {
  isFetching: false,
  error: null,
  onReload: null,
};

const fields = ['phone', 'email'];

const getErrorMessage = (error) => (
  [
    'Ошибка',
    error?.response?.status || error.message,
  ].join(': ')
);

const ConditionStatistics = function SegmentConditionStatistics({
  isFetching,
  data,
  error,
  onReload,
}) {
  const handleReloadClick = () => {
    if (typeof onReload === 'function') {
      onReload();
    }
  };

  return (
    <span className={styles.wrapper}>
      {isFetching && (
        <Spinner
          className={styles.spinner}
          layout="overlay"
          as="span"
        />
      )}
      {Boolean(error) && (
        <span className={styles.error}>
          {Boolean(error) && (
            <span className={styles.errorMessage}>
              {getErrorMessage(error)}
            </span>
          )}
          <button
            type="button"
            className={styles.errorReload}
            onClick={handleReloadClick}
          >
            <IconSync />
          </button>
        </span>
      )}

      {fields.map((field) => (
        <span
          key={field}
          className={styles.value}
        >
          {formatNumber(data[field] || 0)}
        </span>
      ))}
    </span>
  );
};

ConditionStatistics.propTypes = propTypes;
ConditionStatistics.defaultProps = defaultProps;

export default ConditionStatistics;
