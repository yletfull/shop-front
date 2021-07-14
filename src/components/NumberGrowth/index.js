import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const propTypes = {
  value: PropTypes.number.isRequired,
  renderZero: PropTypes.bool,
  increaseSign: PropTypes.node,
  decreaseSign: PropTypes.node,
  formatter: PropTypes.func,
  className: PropTypes.string,
};
const defaultProps = {
  renderZero: false,
  increaseSign: '+',
  decreaseSign: '',
  formatter: (d) => d,
  className: '',
};

const NumberGrowth = function NumberGrowth({
  value,
  renderZero,
  increaseSign,
  decreaseSign,
  formatter,
  className,
  ...props
}) {
  if (!renderZero && !value) {
    return null;
  }

  const isNegative = value < 0;
  const sign = isNegative
    ? decreaseSign
    : increaseSign;

  return (
    <span
      {...props}
      className={cx(
        className,
        isNegative ? styles.negative : styles.positive,
      )}
    >
      {sign}
      {formatter(value)}
    </span>
  );
};

NumberGrowth.propTypes = propTypes;
NumberGrowth.defaultProps = defaultProps;

export default NumberGrowth;
