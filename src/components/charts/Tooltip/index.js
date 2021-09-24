
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import Point from './components/Point';
import EventRect from './components/EventRect';
import Row from './components/Row';

const propTypes = {
  tooltipPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  tooltipValues: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.children])
  ).isRequired,
  chartWidth: PropTypes.number.isRequired,
};

const defaultProps = {
};

const Tooltip = function Tooltip({
  tooltipPosition,
  tooltipValues,
  chartWidth,
  ...props
}) {
  return (
    <div
      className={styles.tooltip}
      style={{
        top: `${tooltipPosition.y}px`,
        left: `${tooltipPosition.x}px`,
        maxWidth: `${chartWidth - tooltipPosition.x}px`,
      }}
      data-active={Boolean(Object.keys(tooltipPosition).length)}
      {...props}
    >
      {Boolean(tooltipValues.length) && tooltipValues.map((Value, ind) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={ind}
          className={styles.tooltipInfo}
        >
          {Value}
        </span>
      ))}
    </div>
  );
};

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

Tooltip.EventRect = EventRect;
Tooltip.Point = Point;
Tooltip.Row = Row;

export default Tooltip;
