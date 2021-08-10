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

const StatisticsDateInputsDropdown = function StatisticsDateInputsDropdown({
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

StatisticsDateInputsDropdown.propTypes = propTypes;
StatisticsDateInputsDropdown.defaultProps = defaultProps;

export default StatisticsDateInputsDropdown;
