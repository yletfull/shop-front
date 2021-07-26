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
  chartWidth: PropTypes.number,
};
const defaultProps = {
  ticks: null,
  ticksCount: 6,
  renderTick: null,
  scaleX: (d) => d,
  scaleY: (d) => d,
  chartWidth: 0,
};

const XYTicksY = function XYTicksY({
  ticks,
  ticksCount,
  renderTick,
  scaleX,
  scaleY,
  chartWidth,
  ...props
}) {
  const items = Array.isArray(ticks) && ticks.length > 0
    ? ticks
    : scaleY?.ticks(ticksCount);
  const tickRenderer = typeof renderTick === 'function'
    ? renderTick({ scaleX, scaleY, chartWidth })
    : (value) => (
      <text
        key={value}
        x={chartWidth}
        y={scaleY(value)}
        dy="-.35em"
      >
        {value}
      </text>
    );

  return (
    <g {...props}>
      {items.map(tickRenderer)}
    </g>
  );
};

XYTicksY.propTypes = propTypes;
XYTicksY.defaultProps = defaultProps;

export default XYTicksY;
