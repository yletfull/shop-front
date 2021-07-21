import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { scaleLinear, scaleTime } from 'd3-scale';
import { useElementSize } from '@/hooks';
import { formatToDate } from '@/utils/format';
import { XYArea } from '@/components/charts';
import {
  getReactionsTonalityData,
  getReactionsTonalityMeta,
} from '../selectors';
import styles from './styles.module.scss';

const padding = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
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
  const scaleYPositive = useMemo(() => scaleLinear()
    .domain([0, meta.maxPositive])
    .range([chartHeight / 2, 0]), [chartHeight, meta]);
  const scaleYNegative = useMemo(() => scaleLinear()
    .domain([0, meta.maxNegative])
    .range([0, chartHeight / 2]), [chartHeight, meta]);

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
              fill="#00ff00"
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
              fill="#ff0000"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

ReactionsTonality.propTypes = propTypes;
ReactionsTonality.defaultProps = defaultProps;

export default ReactionsTonality;
