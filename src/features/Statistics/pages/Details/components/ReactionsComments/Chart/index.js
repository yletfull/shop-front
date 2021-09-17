import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { scaleBand, scaleLinear, scaleTime } from 'd3-scale';
import { useElementSize } from '@/hooks';
import { getDatesRange } from '@/utils/day';
import { formatDate, formatNumber, formatToDate, formatToUnix } from '@/utils/format';
import { XYBars, XYTicksX, XYTicksY } from '@/components/charts';
import { padding } from './constants';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    comments: PropTypes.number,
    reposts: PropTypes.number,
  })),
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
  colors: PropTypes.objectOf(PropTypes.string),
};

const defaultProps = {
  data: [],
  colors: {},
};

const ReactionsCommentsChart = function ReactionsCommentsChart({
  data,
  dateStart,
  dateEnd,
  colors,
}) {
  const chartRef = useRef(null);

  const [width, height] = useElementSize(chartRef);

  const chartHeight = height - padding.bottom - padding.top;
  const chartWidth = width - padding.left - padding.right;

  const maxValue = useMemo(() => Math.max(...data
    .map((d) => Math.max(d.comments, d.reposts))), [data]);
  const dateRangeByDays = useMemo(() => {
    const dateRange = getDatesRange(dateStart, dateEnd);
    return dateRange.map(formatToUnix);
  }, [dateStart, dateEnd]);

  const scaleXGroup = useMemo(() => scaleBand()
    .domain(dateRangeByDays)
    .range([0, chartWidth])
    .round(true)
    .paddingInner(0.3)
    .paddingOuter(0), [dateRangeByDays, chartWidth]);
  const groupBandwidth = scaleXGroup.bandwidth();

  const scaleX = useMemo(() => scaleBand()
    .domain(['comments', 'reposts'])
    .range([0, groupBandwidth])
    .round(true)
    .paddingInner(0.1)
    .paddingOuter(0), [groupBandwidth]);
  const bandwidth = scaleX.bandwidth();

  const scaleXTicks = useMemo(() => scaleTime()
    .domain([formatToDate(dateStart), formatToDate(dateEnd)])
    .range([0, chartWidth]), [dateStart, dateEnd, chartWidth]);

  const scaleY = useMemo(() => scaleLinear()
    .domain([0, maxValue])
    .range([chartHeight, 0]), [chartHeight, maxValue]);

  /* eslint-disable react/function-component-definition */
  const xTickRenderer = () => (value, i, arr) => {
    const tickCanRender = (i === 0 || i === arr?.length - 1);

    if (tickCanRender) {
      return (
        <text
          key={value}
          className={styles.reactionsCommentsChartXTickLabel}
          x={scaleXTicks(value)}
          y={chartHeight}
          dy="1em"
          textAnchor="middle"
        >
          {formatDate(value)}
        </text>
      );
    }
  };
  const yTickRenderer = () => (value) => (
    <text
      key={value}
      className={styles.reactionsCommentsChartYTickLabel}
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
      className={styles.reactionsCommentsChartYTickLine}
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
      className={styles.reactionsCommentsChart}
    >
      <svg
        height={height}
        width={width}
        viewBox={`0 0 ${width} ${height}`}
      >
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          <XYTicksX
            chartHeight={chartHeight}
            scaleX={scaleXTicks}
            scaleY={scaleY}
            renderTick={xTickRenderer}
          />
          <XYTicksY
            scaleY={scaleY}
            ticksCount={4}
            renderTick={yTickLineRenderer}
          />
        </g>

        <g transform={`translate(${padding.left}, ${padding.top})`}>
          {data.map((d) => (
            <g
              key={d.date}
              transform={`translate(${scaleXGroup(formatToUnix(d.date))}, 0)`}
              data-width={groupBandwidth}
            >
              <XYBars
                data={Object.keys(d).filter((key) => key !== 'date')}
                chartHeight={chartHeight}
                getFill={(key) => colors[key] || 'currentColor'}
                getX={(key) => key}
                getY={(key) => (maxValue - d[key])}
                scaleX={scaleX}
                scaleY={scaleY}
                width={bandwidth}
                rx={bandwidth < 8 ? 2 : 4}
                ry={bandwidth < 8 ? 2 : 4}
              />
            </g>
          ))}
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

ReactionsCommentsChart.propTypes = propTypes;
ReactionsCommentsChart.defaultProps = defaultProps;

export default ReactionsCommentsChart;
