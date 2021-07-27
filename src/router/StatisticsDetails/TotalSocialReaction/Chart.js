import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { scaleBand, scaleLinear, scaleTime } from 'd3-scale';
import { formatToDate } from '@/utils/format';
import { XYBars } from '@/components/charts';

const padding = {
  bottom: 16,
  left: 32,
  right: 32,
  top: 16,
};

const propTypes = {
  // data: PropTypes.objectOf(
  //   PropTypes.number
  // ).isRequired,
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

const TotalSocialReactionChart = function TotalSocialReactionChart({
  // data,
  dateStart,
  dateEnd,
  height,
  width,
}) {
  const data = useMemo(() => ({
    '2021-07-14': 10,
    '2021-07-15': 20,
    '2021-07-16': 30,
    '2021-07-17': 40,
    '2021-07-18': 20,
    '2021-07-19': 10,
    '2021-07-20': 30,
    '2021-07-21': 50,
  }), []);

  const chartHeight = height - padding.bottom - padding.top;
  const chartWidth = width - padding.left - padding.right;

  const chartData = useMemo(() => {
    if (!data) {
      return ([]);
    }
    return Object.keys(data).map((date) => ({ value: data[date], date }));
  }, [data]);

  const maxValue = useMemo(() => {
    if (!data || Object.keys(data).length === 0) {
      return 0;
    }
    return Math.max(...Object.keys(data)
      .map((key) => (data[key])));
  }, [data]);

  // const period = dayjs(dateEnd).diff(dateStart, 'day');
  // const paddingInner = Math.min(0.98, period / chartWidth);
  const scaleX = useMemo(() => scaleTime()
    .domain([formatToDate(dateStart), formatToDate(dateEnd)])
    .range([0, chartWidth]), [dateStart, dateEnd, chartWidth]);
  const scaleXBand = useMemo(() => scaleBand()
    .domain(chartData.map((d) => formatToDate(d.date)))
    .range([0, chartWidth])
    .round(true)
    .paddingInner(0)
    .paddingOuter(0), [chartData, chartWidth]);
  const scaleY = useMemo(() => scaleLinear()
    .domain([0, maxValue])
    .range([chartHeight, 0]), [chartHeight, maxValue]);

  return (
    <svg
      height={height}
      width={width}
      viewBox={`0 0 ${width} ${height}`}
    >
      <g transform={`translate(${padding.left}, ${padding.top})`}>
        <XYBars
          data={chartData}
          chartHeight={chartHeight}
          getKey={(d) => d.date}
          getX={(d) => formatToDate(d.date)}
          getY={(d) => d.value || 0}
          scaleX={scaleX}
          scaleY={scaleY}
          scaleXBand={scaleXBand}
        />
      </g>
    </svg>
  );
};

TotalSocialReactionChart.propTypes = propTypes;

export default TotalSocialReactionChart;
