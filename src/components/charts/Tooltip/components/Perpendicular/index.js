import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number,
  color: PropTypes.string,
};

const defaultProps = {
  color: 'rgb(0, 0, 0, 0.2)',
  width: 1,
};

const Perpendicular = function Perpendicular({
  x,
  y,
  color,
  height,
  width,
  ...props
}) {
  return (
    <div
      className={styles.perpendicular}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        height: `${height}px`,
        width: `${width}px`,
        backgroundColor: color,
        position: 'absolute',
        pointerEvents: 'none',
      }}
      {...props}
    />

  );
};

Perpendicular.propTypes = propTypes;
Perpendicular.defaultProps = defaultProps;

export default Perpendicular;
