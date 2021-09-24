import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  bandwidth: PropTypes.number.isRequired,
  customType: PropTypes.string,
  r: PropTypes.number,
  transitionBandwidth: PropTypes.number,
};

const defaultProps = {
  customType: '',
  r: 0,
  transitionBandwidth: 5,
};

const Point = function Point({
  x,
  y,
  color,
  bandwidth,
  customType,
  r,
  transitionBandwidth,
  ...props
}) {
  return (
    <div
      style={{
        backgroundColor: color,
        left: `${x - bandwidth / 2}px`,
        top: `${y - bandwidth / 10}px`,
        width: `${bandwidth}px`,
        height: `${bandwidth / 10}px`,
        position: 'absolute',
        borderRadius: bandwidth < transitionBandwidth ? r : 0,
      }}
      {...props}
    />

  );
};

Point.propTypes = propTypes;
Point.defaultProps = defaultProps;

export default Point;
