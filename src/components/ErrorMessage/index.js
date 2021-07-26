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

const ErrorMessage = function ErrorMessage({
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
      <div
        className={styles.iconWrapper}
      >
        <ExclamationTriangle
          className={styles.icon}
        />
      </div>
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

ErrorMessage.propTypes = propTypes;
ErrorMessage.defaultProps = defaultProps;

export default ErrorMessage;
