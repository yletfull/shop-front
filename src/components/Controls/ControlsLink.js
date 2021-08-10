import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  icon: PropTypes.node,
  to: PropTypes.string.isRequired,
};

const defaultProps = {
  children: null,
  className: '',
  icon: null,
};

const ControlsLink = function ControlsLink({
  children,
  className,
  icon,
  to,
  ...props
}) {
  return (
    <Link
      className={cx(styles.controlsLink, className)}
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
