import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const propTypes = {
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

const Checkbox = function Checkbox({
  className,
  ...props
}) {
  return (
    <input
      className={cx(styles.checkbox, className)}
      type="checkbox"
      {...props}
    />
  );
};

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
