import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ExclamationTriangle from '@/icons/ExclamationTriangle';
import styles from './styles.module.scss';

const propTypes = {
  error: PropTypes.objectOf(
    PropTypes.any,
  ).isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

const StatisticsErrorMessage = function StatisticsErrorMessage({
  error,
  className,
  ...props
}) {
  const { title, message } = error.response?.data?.error || {};

  return (
    <div
      className={cx([
        styles.error,
        className,
      ])}
      {...props}
    >
      <ExclamationTriangle
        className={styles.icon}
      />
      <div>
        {Boolean(title) && (
          <div
            className={styles.title}
          >
            {title}
          </div>
        )}
        <div>
          {Boolean(message) && (
            <div
              className={styles.message}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

StatisticsErrorMessage.propTypes = propTypes;
StatisticsErrorMessage.defaultProps = defaultProps;

export default StatisticsErrorMessage;
