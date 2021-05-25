import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
};
const defaultProps = {
  children: null,
  icon: null,
};

const ControlsButton = function ControlsButton({ children, icon, ...props }) {
  return (
    <button
      className={styles.controlsButton}
      type="button"
      {...props}
    >
      {icon && (
        <span className={styles.controlsButtonIcon}>
          {icon}
        </span>
      )}
      {children}
    </button>
  );
};

ControlsButton.propTypes = propTypes;
ControlsButton.defaultProps = defaultProps;

export default ControlsButton;
