import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear, scaleTime } from 'd3-scale';
import { useElementSize } from '@/hooks';
import { formatDate, formatToDate } from '@/utils/format';
import { XYLine, XYTicksX } from '@/components/charts';
import { padding, linesFactors, linesColors } from '../constants';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  meta: PropTypes.objectOf(PropTypes.any),
  lines: PropTypes.arrayOf(PropTypes.any),
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
};

const defaultProps = {
  data: [],
  meta: {},
  lines: [],
};

const EntityDynamicsChart = function EntityDynamicsChart({
  dateStart,
  dateEnd,
  data,
  meta,
  lines,
}) {
  const chartRef = useRef(null);

  const [width, height] = useElementSize(chartRef);

  const chartHeight = height - padding.bottom - padding.top;
  const chartWidth = width - padding.left - padding.right;

  const scaleX = useMemo(() => scaleTime()
    .domain([formatToDate(dateStart), formatToDate(dateEnd)])
    .range([0, chartWidth]), [dateStart, dateEnd, chartWidth]);
  const scaleY = useMemo(() => scaleLinear()
    .domain([0, meta.maxValue])
    .range([chartHeight, 0]), [chartHeight, meta]);

  /* eslint-disable react/function-component-definition */
  const xTickRenderer = () => (value) => (
    <text
      key={value}
      x={scaleX(value)}
      y={chartHeight}
      dy="1em"
      textAnchor="center"
    >
      {formatDate(value)}
    </text>
  );
  /* eslint-enable react/function-component-definition */

  return (
    <div
      ref={chartRef}
      className={styles.entityDynamicsChart}
    >
      <svg
        height={height}
        width={width}
        viewBox={`0 0 ${width} ${height}`}
      >
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          {lines.map((line) => (
            <XYLine
              key={line}
              data={data}
              getX={(d) => formatToDate(d.date)}
              getY={(d) => Number(d[line]) * (linesFactors[line] || 1)}
              scaleX={scaleX}
              scaleY={scaleY}
              stroke={linesColors[line] || '#000000'}
              strokeWidth="2"
            />
          ))}
        </g>
        <XYTicksX
          className={styles.entityDynamicsChartTicks}
          transform="translate(0, 8)"
          chartHeight={chartHeight}
          scaleX={scaleX}
          scaleY={scaleY}
          ticksCount={10}
          renderTick={xTickRenderer}
        />
      </svg>
    </div>
  );
};

EntityDynamicsChart.propTypes = propTypes;
EntityDynamicsChart.defaultProps = defaultProps;

export default EntityDynamicsChart;
