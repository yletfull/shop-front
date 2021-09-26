import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear, scaleTime } from 'd3-scale';
import { pointer } from 'd3';
import { useElementSize } from '@/hooks';
import { formatDate, formatToDate, formatNumber } from '@/utils/format';
import { XYLine, XYTicksX, XYTicksY, Tooltip } from '@/components/charts';
import { padding, linesFactors, linesColors } from '../constants';
import styles from './styles.module.scss';
import { getRows } from './utils';

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

  const isZeroData = Object.values(data).every((el) => el.value === 0);

  const chartHeight = height - padding.bottom - padding.top;
  const chartWidth = width - padding.left - padding.right;

  const scaleX = useMemo(() => scaleTime()
    .domain([formatToDate(dateStart), formatToDate(dateEnd)])
    .range([0, chartWidth]), [dateStart, dateEnd, chartWidth]);

  const scaleY = useMemo(() => scaleLinear()
    .domain([0, isZeroData ? 1 : meta.maxValue])
    .range([chartHeight, 0]), [chartHeight, meta, isZeroData]);

  /* eslint-disable react/function-component-definition */
  const xTickRenderer = () => (value) => (
    <text
      key={value}
      x={scaleX(value)}
      y={chartHeight}
      dy="2em"
      textAnchor="center"
    >
      {formatDate(value)}
    </text>
  );

  const yTickLineRenderer = () => (value) => (
    <line
      key={value}
      className={styles.entityDynamicsChartTicksLine}
      x1={0}
      y1={scaleY(value)}
      x2={chartWidth}
      y2={scaleY(value)}
    />
  );

  const yTickRenderer = () => (value) => (
    <text
      key={value}
      className={styles.entityDynamicsChartTicks}
      x={0}
      y={scaleY(value)}
      dy=".35em"
    >

      {formatNumber(value)}
    </text>
  );

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

    const posYArr = keys?.map((key) => ({
      key,
      posY: scaleY(item[key] * linesFactors[key] || 0),
    }));

    setTooltipValues([
      `Дата: ${date}`,
      ...getRows(item, keys, linesColors),
    ]);

    setTooltipPosition({
      x: pointerPosX + padding.left + 5 * 1.5,
      y: (Math.min(...posYArr.map((el) => el.posY))
        ?? 0) + padding.top,
    });

    setPointData({
      x: pointerPosX + padding.left,
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
      className={styles.entityDynamicsChart}
    >
      <svg
        height={height}
        width={width}
        viewBox={`0 0 ${width} ${height}`}
      >

        {lines.length === 1 && (
          <g transform={`translate(0, ${padding.top})`}>
            <XYTicksY
              scaleY={scaleY}
              ticksCount={4}
              renderTick={yTickRenderer}
            />
          </g>
        )}

        <XYTicksX
          className={styles.entityDynamicsChartTicks}
          transform="translate(0, 8)"
          chartHeight={chartHeight}
          scaleX={scaleX}
          scaleY={scaleY}
          ticksCount={10}
          renderTick={xTickRenderer}
        />

        <g transform={`translate(${padding.left}, ${padding.top})`}>
          <XYTicksY
            scaleY={scaleY}
            ticksCount={4}
            renderTick={yTickLineRenderer}
          />
          {lines.map((line) => (
            <XYLine
              key={line}
              data={data}
              getX={(d) => formatToDate(d.date)}
              getY={(d) => Number(d[line]) * (linesFactors[line] || 1)}
              scaleX={scaleX}
              scaleY={scaleY}
              getDefined={(d) => Number(d[line]) || Number(d[line]) === 0}
              stroke={linesColors[line] || '#000000'}
              strokeWidth="2"
            />
          ))}
        </g>

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

      <Tooltip
        tooltipPosition={tooltipPosition}
        tooltipValues={tooltipValues}
        chartWidth={width}
      />

      {Boolean(Object.keys(pointData).length) && (
        <Tooltip.Perpendicular
          x={pointData.x}
          y={pointData.y}
          height={chartHeight}
        />
      )}
    </div>
  );
};

EntityDynamicsChart.propTypes = propTypes;
EntityDynamicsChart.defaultProps = defaultProps;

export default EntityDynamicsChart;
