import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

const cssClass = 'link';

const propTypes = {
  appearance: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
};

const defaultProps = {
  appearance: 'default',
  children: null,
  className: '',
  color: 'primary',
};

const Button = function Button(props) {
  const { appearance, children, className, color, to, ...attrs } = props;
  return (
    <Link
      className={cx(
        styles[cssClass],
        styles[`${cssClass}_${appearance}`],
        styles[`${cssClass}_${color}`],
        className,
        attrs.disabled && styles.disabled,
      )}
      to={to}
      {...attrs}
    >
      {children}
    </Link>

  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
