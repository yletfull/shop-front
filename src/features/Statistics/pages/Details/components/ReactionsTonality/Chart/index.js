import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear, scaleTime } from 'd3-scale';
import { pointer } from 'd3';
import { useElementSize } from '@/hooks';
import { formatDate, formatNumber, formatToDate } from '@/utils/format';
import { XYArea, XYTicksX, XYTicksY, Tooltip } from '@/components/charts';
import styles from './styles.module.scss';
import { getRows } from './utils';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    negative: PropTypes.number,
    positive: PropTypes.number,
  })),
  meta: PropTypes.shape({
    max: PropTypes.number,
    maxNegative: PropTypes.number,
    maxPositive: PropTypes.number,
  }),
  colors: PropTypes.shape({
    tonality: PropTypes.shape({
      negative: PropTypes.string,
      positive: PropTypes.string,
    }),
  }),
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
};

const defaultProps = {
  data: [],
  meta: {},
  colors: {},
};

const padding = {
  bottom: 16,
  left: 32,
  right: 32,
  top: 16,
};

const ReactionsTonalityChart = function ReactionsTonalityChart({
  data,
  meta,
  colors,
  dateStart,
  dateEnd,
}) {
  const chartRef = useRef(null);

  const [width, height] = useElementSize(chartRef);

  const isZeroData = Object.values(data).every((el) => el.value === 0);

  const chartHeight = height - padding.bottom - padding.top;
  const chartWidth = width - padding.left - padding.right;

  const scaleX = useMemo(() => scaleTime()
    .domain([formatToDate(dateStart), formatToDate(dateEnd)])
    .range([0, chartWidth]), [dateStart, dateEnd, chartWidth]);
  const scaleY = useMemo(() => scaleLinear()
    .domain([0, meta.max])
    .range([chartHeight, 2]), [chartHeight, meta]);
  const scaleYPositive = useMemo(() => scaleLinear()
    .domain([0, isZeroData ? 1 : meta.max])
    .range([chartHeight / 2, 0]), [chartHeight, meta, isZeroData]);
  const scaleYNegative = useMemo(() => scaleLinear()
    .domain([0, isZeroData ? -1 : meta.max])
    .range([0, chartHeight / 2]), [chartHeight, meta, isZeroData]);

  /* eslint-disable react/function-component-definition */
  const yPositiveLineTickRenderer = () => (value) => (
    <line
      key={value}
      className={styles.reactionsTonalityTickYLine}
      x1={0}
      y1={scaleYPositive(value)}
      x2={chartWidth}
      y2={scaleYPositive(value)}
    />
  );
  const yNegativeLineTickRenderer = () => (value) => (
    <line
      key={value}
      className={styles.reactionsTonalityTickYLine}
      x1={0}
      y1={scaleYNegative(value)}
      x2={chartWidth}
      y2={scaleYNegative(value)}
    />
  );

  const yPositiveTickRenderer = () => (value) => (
    <text
      key={value}
      className={styles.reactionsTonalityTickYLabel}
      x={0}
      y={scaleYPositive(value)}
      dy=".35em"
      stroke="hsla(0, 0%, 100%, .25)"
    >
      {formatNumber(value)}
    </text>
  );
  const yNegativeTickRenderer = () => (value) => (
    <text
      key={value}
      className={styles.reactionsTonalityTickYLabel}
      x={0}
      y={scaleYNegative(value)}
      dy=".35em"
    >
      {formatNumber(value)}
    </text>
  );

  const xTickLineRenderer = () => (value) => (
    <line
      key={value}
      className={styles.reactionsTonalityTickXLine}
      x1={scaleX(value)}
      y1="0"
      x2={scaleX(value)}
      y2={chartHeight}
      stroke="hsla(0, 0%, 100%, .25)"
    />
  );

  const xTickRenderer = () => (value, i, arr) => {
    const tickCanRender = (i === 0 || i === arr?.length - 1);

    if (tickCanRender) {
      return (
        <text
          key={value}
          className={styles.reactionsTonalityTickXLabel}
          x={scaleX(value)}
          y={chartHeight}
          dy="1em"
          textAnchor="middle"
        >
          {formatDate(value)}
        </text>
      );
    }
  };

  /* eslint-enable react/function-component-definition */

  const [tooltipPosition, setTooltipPosition] = useState({});
  const [pointData, setPointData] = useState({});
  const [tooltipValues, setTooltipValues] = useState(['']);

  const handlePointerMove = (e) => {
    const pointerPosX = pointer(e)[0] - padding.left;

    const unixDate = scaleX.invert(pointerPosX);
    const date = formatDate(unixDate);
    const item = data?.find((i) => formatDate(i.date) === date) || {};
    const keys = Object.keys(item)?.filter((key) => key !== 'date' && key !== 'dateGroup') || [];

    const scalesY = {
      positive: scaleYPositive,
      negative: scaleYPositive,
    };

    const posYArr = keys?.map((key) => ({
      key,
      posY: scalesY[key](item[key] || 0),
    }));

    const posX = scaleX(formatToDate(item?.dateGroup));

    setTooltipValues([
      `Дата: ${date}`,
      ...getRows(item, keys, colors.tonality),
    ]);

    setTooltipPosition({
      x: (posX ?? pointerPosX) + padding.left + 5 * 1.5,
      y: (Math.min(...posYArr.map((el) => el.posY))
        ?? 0) + padding.top,
    });

    setPointData({
      x: (posX ?? pointerPosX) + padding.left,
      y: padding.top,
    });
  };

  const handlePointerLeave = () => {
    setTooltipPosition({});
    setPointData({});
  };

  return (
    <div
      ref={chartRef}
      className={styles.reactionsTonalityChart}
    >
      <svg
        height={height}
        width={width}
        viewBox={`0 0 ${width} ${height}`}
      >
        <XYTicksY
          transform={`translate(35, ${padding.top})`}
          scaleX={scaleX}
          scaleY={scaleYPositive}
          ticksCount={2}
          renderTick={yPositiveLineTickRenderer}
        />
        <XYTicksY
          transform={`translate(35, ${padding.top + (chartHeight / 2)})`}
          scaleX={scaleX}
          scaleY={scaleYNegative}
          ticksCount={2}
          renderTick={yNegativeLineTickRenderer}
        />

        <g transform={`translate(${padding.left}, ${padding.top})`}>
          <XYArea
            data={data}
            chartHeight={chartHeight / 2}
            getX={(d) => formatToDate(d.date)}
            getY={(d) => d.positive || 0}
            scaleX={scaleX}
            scaleY={scaleYPositive}
            curve="monotoneX"
            fill={colors?.tonality?.positive}
          />
        </g>
        <g transform={`translate(${padding.left}, ${padding.top + (chartHeight / 2)})`}>
          <XYArea
            data={data}
            chartHeight={chartHeight / 2}
            getX={(d) => formatToDate(d.date)}
            getY={(d) => d.negative || 0}
            scaleX={scaleX}
            scaleY={scaleYNegative}
            getBaseY={() => 0}
            curve="monotoneX"
            fill={colors?.tonality?.negative}
          />
        </g>

        <XYTicksY
          transform={`translate(0, ${padding.top})`}
          scaleX={scaleX}
          scaleY={scaleYPositive}
          ticksCount={2}
          renderTick={yPositiveTickRenderer}
        />

        <XYTicksY
          transform={`translate(0, ${padding.top + (chartHeight / 2)})`}
          scaleX={scaleX}
          scaleY={scaleYNegative}
          ticksCount={2}
          renderTick={yNegativeTickRenderer}
        />

        <XYTicksX
          transform={`translate(${padding.left}, ${padding.top})`}
          chartHeight={chartHeight}
          scaleX={scaleX}
          scaleY={scaleY}
          ticksCount={6}
          renderTick={xTickLineRenderer}
        />

        <g transform={`translate(0, ${padding.top})`}>
          <Tooltip.EventRect
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            x={padding.left}
            y={padding.top}
            width={chartWidth}
            height={chartHeight}
          />
        </g>

      </svg>

      <XYTicksX
        transform={`translate(${padding.left}, ${padding.top})`}
        chartHeight={chartHeight}
        scaleX={scaleX}
        scaleY={scaleY}
        renderTick={xTickRenderer}
      />

      <Tooltip
        tooltipPosition={tooltipPosition}
        tooltipValues={tooltipValues}
        chartWidth={width}
      />

      {Boolean(Object.keys(pointData).length) && (
        <Tooltip.Perpendicular
          className={styles.tooltipPoint}
          x={pointData.x}
          y={pointData.y}
          height={chartHeight}
        />
      )}
    </div>
  );
};

ReactionsTonalityChart.propTypes = propTypes;
ReactionsTonalityChart.defaultProps = defaultProps;

export default ReactionsTonalityChart;
