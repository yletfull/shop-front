import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
  bandwidth: PropTypes.number.isRequired,
  customType: PropTypes.string,
  r: PropTypes.string,
  transitionBandwidth: PropTypes.number,
};

const defaultProps = {
  customType: '',
  r: 0,
  transitionBandwidth: 5,
};

const Point = function Point({
  cx,
  cy,
  fill,
  bandwidth,
  customType,
  r,
  transitionBandwidth,
  ...props
}) {
  return (
    (bandwidth < transitionBandwidth)
      ? (
        <circle
          fill={fill}
          cx={cx}
          cy={cy}
          r={r || bandwidth / 2}
          {...props}
        />
      )
      : (
        <rect
          fill={fill}
          x={cx - bandwidth / 2}
          y={cy - bandwidth / 10}
          width={bandwidth}
          height={bandwidth / 10}
          {...props}
        />
      )
  );
};

Point.propTypes = propTypes;
Point.defaultProps = defaultProps;

export default Point;
