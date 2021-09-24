import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onPointerMove: PropTypes.func.isRequired,
  onPointerLeave: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

const defaultProps = {
};

const EventRect = function EventRect({
  onPointerLeave,
  onPointerMove,
  width,
  height,
  x,
  y,
  ...props
}) {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      fillOpacity={0}
      {...props}
    />
  );
};

EventRect.propTypes = propTypes;
EventRect.defaultProps = defaultProps;

export default EventRect;
