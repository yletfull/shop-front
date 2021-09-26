import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  bandwidth: PropTypes.number.isRequired,
  transitionBandwidth: PropTypes.number,
};

const defaultProps = {
  transitionBandwidth: 0,
};

const Point = function Point({
  x,
  y,
  color,
  bandwidth,
  transitionBandwidth,
  ...props
}) {
  return (
    <div
      style={{
        backgroundColor: color,
        left: `${x - bandwidth / 2}px`,
        top: `${bandwidth < transitionBandwidth ? y - bandwidth / 2 : y - bandwidth / 10}px`,
        width: `${bandwidth}px`,
        height: `${bandwidth < transitionBandwidth ? bandwidth : bandwidth / 10}px`,
        position: 'absolute',
        borderRadius: bandwidth < transitionBandwidth ? '50%' : 0,
        borderColor: '######',
      }}
      {...props}
    />

  );
};

Point.propTypes = propTypes;
Point.defaultProps = defaultProps;

export default Point;
