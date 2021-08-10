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

const Radio = function Radio({
  className,
  ...props
}) {
  return (
    <input
      className={cx(styles.radio, className)}
      type="radio"
      {...props}
    />
  );
};

Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;

export default Radio;
