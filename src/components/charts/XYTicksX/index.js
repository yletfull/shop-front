import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  ticks: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  ),
  ticksCount: PropTypes.number,
  renderTick: PropTypes.func,
  scaleX: PropTypes.func,
  scaleY: PropTypes.func,
  chartHeight: PropTypes.number,
};
const defaultProps = {
  ticks: null,
  ticksCount: 6,
  renderTick: null,
  scaleX: (d) => d,
  scaleY: (d) => d,
  chartHeight: 0,
};

const XYTicksX = function XYTicksX({
  ticks,
  ticksCount,
  renderTick,
  scaleX,
  scaleY,
  chartHeight,
  ...props
}) {
  const items = Array.isArray(ticks) && ticks.length > 0
    ? ticks
    : scaleX?.ticks(ticksCount);

  const tickRenderer = typeof renderTick === 'function'
    ? renderTick({ scaleX, scaleY, chartHeight })
    : ((value) => (
      <text
        key={value}
        x={scaleX(value)}
        y={chartHeight}
        dy="1em"
        textAnchor="center"
      >
        {value}
      </text>
    ));

  return (
    <g {...props}>
      {items.map(tickRenderer)}
    </g>
  );
};

XYTicksX.propTypes = propTypes;
XYTicksX.defaultProps = defaultProps;

export default XYTicksX;
