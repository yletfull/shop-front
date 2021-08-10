import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const defaultProps = {
  children: null,
  className: '',
};

const Controls = function Controls({
  children,
  className,
  ...props
}) {
  return (
    <div
      className={cx(styles.controls, className)}
      {...props}
    >
      {children}
    </div>
  );
};

Controls.propTypes = propTypes;
Controls.defaultProps = defaultProps;

export { default as ControlsButton } from './ControlsButton';
export { default as ControlsLink } from './ControlsLink';

export default Controls;
