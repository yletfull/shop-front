import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from '@/components/Button';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  icon: PropTypes.node,
};

const defaultProps = {
  children: null,
  className: '',
  icon: null,
};

const ControlsButton = function ControlsButton({
  children,
  className,
  icon,
  ...props
}) {
  return (
    <Button
      appearance="control"
      className={cx(styles.controls, className)}
      {...props}
    >
      {icon && (
        <span className={styles.controlsLinkIcon}>
          {icon}
        </span>
      )}
      {children}
    </Button>
  );
};

ControlsButton.propTypes = propTypes;
ControlsButton.defaultProps = defaultProps;

export default ControlsButton;
