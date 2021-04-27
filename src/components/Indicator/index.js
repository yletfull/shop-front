import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.module.scss';


const propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};

const defaultProps = {
  color: 'red',
  className: '',
};

const Button = function Button(props) {
  const { color, className } = props;
  return (
    <span
      className={cx(
        styles.indicator,
        styles[color],
        className,
      )}
    />

  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
