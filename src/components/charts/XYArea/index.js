import React from 'react';
import PropTypes from 'prop-types';
import { area } from 'd3-shape';
import { mapCurve } from '../utils';

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  ).isRequired,
  getX: PropTypes.func,
  getY: PropTypes.func,
  getBaseY: PropTypes.func,
  scaleX: PropTypes.func,
  scaleY: PropTypes.func,
  chartHeight: PropTypes.number,
  curve: PropTypes.oneOf(Object.keys(mapCurve)),
};
const defaultProps = {
  getX: (d) => d.x,
  getY: (d) => d.y,
  getBaseY: null,
  scaleX: (d) => d,
  scaleY: (d) => d,
  chartHeight: 0,
  curve: 'linear',
};

const XYArea = function XYArea({
  data,
  getX,
  getY,
  getBaseY,
  scaleX,
  scaleY,
  chartHeight,
  curve,
  ...props
}) {
  const areaPath = (
    area()
      .curve(mapCurve[curve])
      .x((d, i, arr) => scaleX(getX(d, i, arr)))
      .y1((d, i, arr) => scaleY(getY(d, i, arr)))
      .y0(typeof getBaseY === 'function'
        ? (d, i, arr) => scaleY(getBaseY(d, i, arr))
        : chartHeight)
  )(data);

  return (
    <path
      d={areaPath}
      {...props}
    />
  );
};

XYArea.propTypes = propTypes;
XYArea.defaultProps = defaultProps;

export default XYArea;
