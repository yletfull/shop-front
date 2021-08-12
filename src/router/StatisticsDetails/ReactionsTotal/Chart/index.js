import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { scaleBand, scaleLinear, scaleTime } from 'd3-scale';
import { useElementSize } from '@/hooks';
import { getDatesRange } from '@/utils/day';
import { formatDate, formatNumber, formatToDate, formatToUnix } from '@/utils/format';
import { XYBars, XYTicksX, XYTicksY } from '@/components/charts';
import styles from './styles.module.scss';

const padding = {
  bottom: 16,
  left: 32,
  right: 32,
  top: 16,
};

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    value: PropTypes.number,
  })),
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
};

const defaultProps = {
  data: [],
};

const ReactionsTotalChart = function ReactionsTotalChart({
  data,
  dateStart,
  dateEnd,
}) {
  const chartRef = useRef(null);

  const [width, height] = useElementSize(chartRef);

  const chartHeight = height - padding.bottom - padding.top;
  const chartWidth = width - padding.left - padding.right;

  const maxValue = useMemo(() => Math.max(...data.map((d) => d.value)), [data]);
  const dateRangeByDays = useMemo(() => {
    const dateRange = getDatesRange(dateStart, dateEnd);
    return dateRange.map(formatToUnix);
  }, [dateStart, dateEnd]);

  const scaleX = useMemo(() => scaleBand()
    .domain(dateRangeByDays)
    .range([0, chartWidth])
    .round(true)
    .paddingInner(0.3)
    .paddingOuter(0), [dateRangeByDays, chartWidth]);
  const bandwidth = scaleX.bandwidth();

  const scaleXTicks = useMemo(() => scaleTime()
    .domain([formatToDate(dateStart), formatToDate(dateEnd)])
    .range([0, chartWidth]), [dateStart, dateEnd, chartWidth]);

  const scaleY = useMemo(() => scaleLinear()
    .domain([0, maxValue])
    .range([chartHeight, 0]), [chartHeight, maxValue]);

  /* eslint-disable react/function-component-definition */
  const xTickRenderer = () => (value) => (
    <text
      key={value}
      className={styles.reactionsTotalChartXTickLabel}
      x={scaleXTicks(value)}
      y={chartHeight}
      dy="1em"
      textAnchor="middle"
    >
      {formatDate(value)}
    </text>
  );
  const yTickRenderer = () => (value) => (
    <text
      key={value}
      className={styles.reactionsTotalChartYTickLabel}
      x={0}
      y={scaleY(value)}
      dy=".35em"
    >
      {formatNumber(value)}
    </text>
  );
  const yTickLineRenderer = () => (value) => (
    <line
      key={value}
      className={styles.reactionsTotalChartYTickLine}
      x1={0}
      y1={scaleY(value)}
      x2={chartWidth}
      y2={scaleY(value)}
    />
  );
  /* eslint-enable react/function-component-definition */

  return (
    <div
      ref={chartRef}
      className={styles.reactionsTotalChart}
    >
      <svg
        height={height}
        width={width}
        viewBox={`0 0 ${width} ${height}`}
      >
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          <XYTicksY
            scaleY={scaleY}
            ticksCount={4}
            renderTick={yTickLineRenderer}
          />
          <XYTicksX
            chartHeight={chartHeight}
            scaleX={scaleXTicks}
            scaleY={scaleY}
            ticksCount={4}
            renderTick={xTickRenderer}
          />
        </g>

        <g transform={`translate(${padding.left}, ${padding.top})`}>
          <XYBars
            data={data}
            chartHeight={chartHeight}
            getFill={() => 'hsl(210, 7%, 77%)'}
            getX={(d) => formatToUnix(d.date)}
            getY={(d) => (maxValue - d.value)}
            getKey={(d) => d.date}
            scaleX={scaleX}
            scaleY={scaleY}
            width={bandwidth}
            rx={bandwidth < 8 ? 2 : 4}
            ry={bandwidth < 8 ? 2 : 4}
          />
        </g>

        <g transform={`translate(0, ${padding.top})`}>
          <XYTicksY
            scaleY={scaleY}
            ticksCount={4}
            renderTick={yTickRenderer}
          />
        </g>
      </svg>
    </div>
  );
};

ReactionsTotalChart.propTypes = propTypes;
ReactionsTotalChart.defaultProps = defaultProps;

export default ReactionsTotalChart;