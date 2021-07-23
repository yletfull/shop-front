import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { scaleLinear, scaleTime } from 'd3-scale';
import { useElementSize } from '@/hooks';
import { formatDate, formatNumber, formatToDate } from '@/utils/format';
import { XYArea, XYTicksX, XYTicksY } from '@/components/charts';
import {
  colors,
} from '../constants';
import {
  getReactionsTonalityData,
  getReactionsTonalityMeta,
} from '../selectors';
import styles from './styles.module.scss';

const padding = {
  bottom: 16,
  left: 32,
  right: 32,
  top: 16,
};

const propTypes = {
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
};

const defaultProps = {};

const ReactionsTonality = function ReactionsTonality({
  dateStart,
  dateEnd,
}) {
  const chartRef = useRef(null);

  const data = useSelector(getReactionsTonalityData);
  const meta = useSelector(getReactionsTonalityMeta);

  const [width, height] = useElementSize(chartRef);

  const chartHeight = height - padding.bottom - padding.top;
  const chartWidth = width - padding.left - padding.right;

  const scaleX = useMemo(() => scaleTime()
    .domain([formatToDate(dateStart), formatToDate(dateEnd)])
    .range([0, chartWidth]), [dateStart, dateEnd, chartWidth]);
  const scaleY = useMemo(() => scaleLinear()
    .domain([0, meta.maxPositive + meta.maxNegative])
    .range([chartHeight, 0]), [chartHeight, meta]);
  const scaleYPositive = useMemo(() => scaleLinear()
    .domain([0, meta.maxPositive])
    .range([chartHeight / 2, 0]), [chartHeight, meta]);
  const scaleYNegative = useMemo(() => scaleLinear()
    .domain([0, meta.maxNegative])
    .range([0, chartHeight / 2]), [chartHeight, meta]);

  /* eslint-disable react/function-component-definition */
  const xTickRenderer = () => (value) => (
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
  /* eslint-enable react/function-component-definition */

  return (
    <div className={styles.reactionsTonality}>
      <div
        ref={chartRef}
        className={styles.reactionsTonalityChart}
      >
        <svg
          height={height}
          width={width}
          viewBox={`0 0 ${width} ${height}`}
        >
          <g transform={`translate(${padding.left}, ${padding.top})`}>
            <XYArea
              data={data}
              chartHeight={chartHeight / 2}
              getX={(d) => formatToDate(d.date)}
              getY={(d) => d.negative || 0}
              scaleX={scaleX}
              scaleY={scaleYPositive}
              fill={colors?.tonality?.positive}
            />
          </g>
          <g transform={`translate(${padding.left}, ${padding.top + (chartHeight / 2)})`}>
            <XYArea
              data={data}
              chartHeight={chartHeight / 2}
              getX={(d) => formatToDate(d.date)}
              getY={(d) => d.negative || 0}
              getBaseY={() => 0}
              scaleX={scaleX}
              scaleY={scaleYNegative}
              fill={colors?.tonality?.negative}
            />
          </g>
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
          <XYTicksX
            transform={`translate(${padding.left}, ${padding.top})`}
            chartHeight={chartHeight}
            scaleX={scaleX}
            scaleY={scaleY}
            ticksCount={6}
            renderTick={xTickRenderer}
          />
        </svg>
      </div>
    </div>
  );
};

ReactionsTonality.propTypes = propTypes;
ReactionsTonality.defaultProps = defaultProps;

export default ReactionsTonality;