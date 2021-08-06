import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
};

const Controls = function Controls({ children }) {
  return (
    <div className={styles.controls}>
      {children}
    </div>
  );
};

Controls.propTypes = propTypes;
Controls.defaultProps = defaultProps;

export { default as ControlsButton } from './ControlsButton';
export { default as ControlsLink } from './ControlsLink';

export default Controls;
