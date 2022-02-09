import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool,
  className: PropTypes.string,
};
const defaultProps = {
  isActive: false,
  className: '',
};

const Button = function ButtonView({
  children,
  isActive,
  className,
  ...props
}) {
  return (
    <button
      type="button"
      className={cx(
        styles.button,
        { [styles.active]: isActive },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';
Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
