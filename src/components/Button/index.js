import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const cssClass = 'button';

const propTypes = {
  appearance: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

const defaultProps = {
  appearance: 'default',
  children: null,
  className: '',
  color: 'primary',
};

const Button = function Button({ appearance, children, className, color, ...attrs }) {
  return (
    <button
      type="button"
      className={cx(
        styles[cssClass],
        styles[`${cssClass}_${appearance}`],
        styles[`${cssClass}_${color}`],
        className,
      )}
      {...attrs}
    >
      {children}
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
