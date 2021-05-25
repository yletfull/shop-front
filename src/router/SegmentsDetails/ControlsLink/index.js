import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  to: PropTypes.string.isRequired,
};

const defaultProps = {
  children: null,
  icon: null,
};

const ControlsLink = function ControlsLink({ children, icon, to, ...props }) {
  return (
    <Link
      className={styles.controlsLink}
      to={to}
      {...props}
    >
      {icon && (
        <span className={styles.controlsLinkIcon}>
          {icon}
        </span>
      )}
      {children}
    </Link>
  );
};

ControlsLink.propTypes = propTypes;
ControlsLink.defaultProps = defaultProps;

export default ControlsLink;
