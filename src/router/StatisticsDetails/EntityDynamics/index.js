import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { scaleLinear, scaleTime } from 'd3-scale';
import { useElementSize } from '@/hooks';
import { formatDate, formatToDate } from '@/utils/format';
import { XYLine, XYTicksX } from '@/components/charts';
import {
  getEntityDynamicsData,
  getEntityDynamicsMeta,
} from '../selectors';
import {
  padding,
  lines,
  linesLabels,
  linesFactors,
  linesColors,
} from './constants';
import styles from './styles.module.scss';

const propTypes = {
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
  header: PropTypes.node,
};

const defaultProps = {
  header: null,
};

const EntityDynamics = function EntityDynamics({
  dateStart,
  dateEnd,
  header,
}) {
  const chartRef = useRef(null);

  const data = useSelector(getEntityDynamicsData);
  const meta = useSelector(getEntityDynamicsMeta);

  const [width, height] = useElementSize(chartRef);

  const [visibleLines, setVisibleLines] = useState(Object.values(lines));

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

  const handleChangeCheckbox = (e) => {
    const { name } = e?.target || {};
    if (!name) {
      return;
    }
    const index = visibleLines.indexOf(name);
    setVisibleLines(index === (-1)
      ? [...visibleLines, name]
      : [
        ...visibleLines.slice(0, index),
        ...visibleLines.slice(index + 1),
      ]);
  };

  return (
    <div className={styles.entityDynamics}>
      {header && (
        <div className={styles.entityDynamicsHeader}>
          {header}
        </div>
      )}
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
            {visibleLines.map((line) => (
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
      <div className={styles.entityDynamicsLegend}>
        {Object.values(lines).map((key) => (
          <label
            key={key}
            className={styles.entityDynamicsLegendLabel}
          >
            <input
              type="checkbox"
              name={key}
              checked={visibleLines.includes(key)}
              disabled={visibleLines.length === 1 && visibleLines[0] === key}
              onChange={handleChangeCheckbox}
            />
            {`${linesLabels[key]} (x${linesFactors[key]})`}
          </label>
        ))}
      </div>
    </div>
  );
};

EntityDynamics.propTypes = propTypes;
EntityDynamics.defaultProps = defaultProps;

export default EntityDynamics;
