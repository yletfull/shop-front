import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const defaultProps = {
  children: '',
  className: '',
};

const StatisticsDateInputs = function StatisticsDateInputs({
  children,
  className,
  ...props
}) {
  return (
    <div
      className={cx(styles.dropdown, className)}
      {...props}
    >
      {children}
    </div>
  );
};

StatisticsDateInputs.propTypes = propTypes;
StatisticsDateInputs.defaultProps = defaultProps;

export default StatisticsDateInputs;
