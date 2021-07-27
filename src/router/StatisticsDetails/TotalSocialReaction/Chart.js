import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { scaleBand, scaleLinear } from 'd3-scale';
import { useElementSize } from '@/hooks';
import { getDatesRange } from '@/utils/day';
import { formatToUnix } from '@/utils/format';
import { XYBars } from '@/components/charts';
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

const TotalSocialReactionChart = function TotalSocialReactionChart({
  data,
  dateStart,
  dateEnd,
}) {
  const chartRef = useRef(null);

  const [width, height] = useElementSize(chartRef);

  const chartHeight = height - padding.bottom - padding.top;
  const chartWidth = width - padding.left - padding.right;

  const maxValue = useMemo(() => Math.max(...data
    .map((d) => d.value)), [data]);

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
    .domain(['value'])
    .range([0, groupBandwidth])
    .round(true)
    .paddingInner(0.1)
    .paddingOuter(0), [groupBandwidth]);
  const bandwidth = scaleX.bandwidth();

  const scaleY = useMemo(() => scaleLinear()
    .domain([0, maxValue])
    .range([chartHeight, 0]), [chartHeight, maxValue]);

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
          {data.map((d) => (
            <g
              key={d.date}
              transform={`translate(${scaleXGroup(formatToUnix(d.date))}, 0)`}
              data-width={groupBandwidth}
            >
              <XYBars
                data={Object.keys(d).filter((key) => key !== 'date')}
                chartHeight={chartHeight}
                getX={(key) => key}
                getY={(key) => d[key]}
                scaleX={scaleX}
                scaleY={scaleY}
                width={bandwidth}
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

TotalSocialReactionChart.propTypes = propTypes;
TotalSocialReactionChart.defaultProps = defaultProps;

export default TotalSocialReactionChart;
