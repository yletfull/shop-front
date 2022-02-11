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

const Checkbox = function ButtonView({
  children,
  isActive,
  className,
  ...props
}) {
  return (
    <input
      type="checkbox"
      className={cx(
        styles.button,
        { [styles.active]: isActive },
        className,
      )}
      {...props}
    >
      {children}
    </input>
  );
};

Checkbox.displayName = 'Checkbox';
Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
