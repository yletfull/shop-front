import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  chartHeight: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  })),
  getFill: PropTypes.func,
  getKey: PropTypes.func,
  getX: PropTypes.func,
  getY: PropTypes.func,
  scaleX: PropTypes.func,
  scaleY: PropTypes.func,
  rendererRect: PropTypes.func,
  width: PropTypes.number,
};

const defaultProps = {
  chartHeight: 0,
  data: [],
  getFill: () => 'currentColor',
  getKey: (d) => d,
  getX: (d) => d.x,
  getY: (d) => d.y,
  scaleX: (d) => d,
  scaleY: (d) => d,
  rendererRect: null,
  width: 1,
};

const XYBars = function XYBars({
  chartHeight,
  data,
  getFill,
  getKey,
  getX,
  getY,
  scaleX,
  scaleY,
  rendererRect,
  width,
  ...props
}) {
  const rectRenderer = typeof rendererRect === 'function'
    ? rendererRect({ chartHeight, scaleX, scaleY, getX, getY })
    : (d, i, arr) => (
      <rect
        key={getKey(d, i, arr)}
        x={scaleX(getX(d, i, arr)) - ((width || 0) / 2)}
        y={chartHeight - scaleY(getY(d, i, arr))}
        height={scaleY(getY(d, i, arr))}
        width={width}
        fill={getFill(d, i, arr)}
        {...props}
      />
    );
  return data.map(rectRenderer);
};

XYBars.propTypes = propTypes;
XYBars.defaultProps = defaultProps;

export default XYBars;
