import React from 'react';
import PropTypes from 'prop-types';
import { line } from 'd3-shape';
import { mapCurve } from '../utils';

const propTypes = {
  curve: PropTypes.oneOf(Object.keys(mapCurve)),
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  })),
  getX: PropTypes.func,
  getY: PropTypes.func,
  scaleX: PropTypes.func,
  scaleY: PropTypes.func,
};
const defaultProps = {
  curve: 'linear',
  data: [],
  getX: (d) => d.x,
  getY: (d) => d.y,
  scaleX: (d) => d,
  scaleY: (d) => d,
};

const XYLine = function XYLine({
  curve,
  data,
  getX,
  getY,
  scaleX,
  scaleY,
  ...props
}) {
  const path = line()
    .curve(mapCurve[curve])
    .x((d, i, arr) => scaleX(getX(d, i, arr)))
    .y((d, i, arr) => scaleY(getY(d, i, arr)))(data);

  return (
    <path
      d={path}
      fill="none"
      {...props}
    />
  );
};

XYLine.propTypes = propTypes;
XYLine.defaultProps = defaultProps;

export default XYLine;
