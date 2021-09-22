import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { scaleBand, scaleLinear, scaleTime } from 'd3-scale';
import { pointer } from 'd3';
import { useElementSize } from '@/hooks';
import { getDatesRange } from '@/utils/day';
import { formatDate, formatNumber, formatToDate, formatToUnix } from '@/utils/format';
import { XYBars, XYTicksX, XYTicksY } from '@/components/charts';
import styles from './styles.module.scss';

const padding = {
  bottom: 16,
  left: 32,
  right: 0,
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

const ReactionsFacebookChart = function ReactionsFacebookChart({
  data,
  dateStart,
  dateEnd,
}) {
  const chartRef = useRef(null);

  const [width, height] = useElementSize(chartRef);

  const chartHeight = height - padding.bottom - padding.top;
  const chartWidth = width - padding.left - padding.right;

  const isZeroData = Object.values(data).every((el) => el.value === 0);

  const maxValue = useMemo(() => (isZeroData
    ? 1
    : Math.max(...data.map((d) => d.value))), [data, isZeroData]);

  const dateRangeByDays = useMemo(() => {
    const dateRange = getDatesRange(dateStart, dateEnd);
    return dateRange.map(formatToUnix);
  }, [dateStart, dateEnd]);

  const scaleX = useMemo(() => scaleBand()
    .domain(dateRangeByDays)
    .range([0, chartWidth])
    .paddingInner(0.1)
    .paddingOuter(0), [dateRangeByDays, chartWidth]);
  const bandwidth = scaleX.bandwidth();

  const scaleXTicks = useMemo(() => scaleTime()
    .domain([formatToDate(dateStart), formatToDate(dateEnd)])
    .range([0, chartWidth]), [dateStart, dateEnd, chartWidth]);

  const scaleY = useMemo(() => scaleLinear()
    .domain([0, maxValue])
    .range([chartHeight, 2]), [chartHeight, maxValue]);

  /* eslint-disable react/function-component-definition */
  const xTickRenderer = () => (value, i, arr) => {
    const tickCanRender = (i === 0 || i === arr?.length - 1);

    if (tickCanRender) {
      return (
        <text
          key={value}
          className={styles.XTickLabel}
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
      className={styles.YTickLabel}
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
      className={styles.YTickLine}
      x1={0}
      y1={scaleY(value)}
      x2={chartWidth}
      y2={scaleY(value)}
    />
  );
  /* eslint-enable react/function-component-definition */

  const [tooltipPosition, setTooltipPosition] = useState({});
  const [pointData, setPointData] = useState({});
  const [tooltipValues, setTooltipValues] = useState([]);

  const handlePointerMove = (e) => {
    const pointerPosX = pointer(e)[0] - padding.left;

    const date = formatDate(scaleXTicks.invert(pointerPosX));
    const item = data?.find((i) => formatDate(i.date) === date);
    const posY = scaleY(item?.value);
    const posX = scaleX(formatToUnix(item?.date));

    setTooltipValues([
      `Дата: ${date}`,
      `Значение: ${item?.value ?? 'Нет данных'}`,
    ]);

    setTooltipPosition({
      x: (posX ?? pointerPosX) + padding.left + 10,
      y: (posY ?? chartHeight) + padding.top,
    });

    setPointData({
      x: (posX ?? pointerPosX) + padding.left + bandwidth / 2,
      y: (posY ?? chartHeight),
      color: 'red',
    });
  };

  const handlePointerLeave = () => {
    setTooltipPosition({});
  };

  return (
    <div
      ref={chartRef}
      className={styles.chart}
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
            ticksCount={isZeroData ? 1 : 4}
            renderTick={yTickRenderer}
          />
        </g>

        <g transform={`translate(0, ${padding.top})`}>
          <rect
            onPointerMoveCapture={handlePointerMove}
            onPointerLeaveCapture={handlePointerLeave}
            x={padding.left}
            y={padding.top}
            width={chartWidth}
            height={chartHeight}
            fillOpacity={0}
          />

          {Boolean(Object.keys(pointData).length) && (
            <circle
              className={styles.tooltipPoint}
              fill={pointData.color}
              cx={pointData.x}
              cy={pointData.y}
              r={bandwidth / 2}
            />
          )}
        </g>
      </svg>

      <div
        className={styles.tooltip}
        style={{
          top: `${tooltipPosition.y}px`,
          left: `${tooltipPosition.x}px`,
          maxWidth: `${width - tooltipPosition.x}px`,
        }}
        data-active={Boolean(Object.keys(tooltipPosition).length)}
      >
        {Boolean(tooltipValues.length) && tooltipValues.map((tooltip, ind) => (
          <span
          // eslint-disable-next-line react/no-array-index-key
            key={ind}
            className={styles.tooltipInfo}
          >
            {tooltip}
          </span>
        ))}
      </div>

    </div>
  );
};

ReactionsFacebookChart.propTypes = propTypes;
ReactionsFacebookChart.defaultProps = defaultProps;

export default ReactionsFacebookChart;
