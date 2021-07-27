import React, { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { scaleBand, scaleLinear, scaleTime } from 'd3-scale';
import { useElementSize, useService } from '@/hooks';
import { formatToDate } from '@/utils/format';
import { XYBars } from '@/components/charts';
import WithSpinner from '../components/WithSpinner';
import ErrorMessage from '../components/ErrorMessage';
import service from '../service';
import styles from './styles.module.scss';

const propTypes = {
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
};

const defaultProps = {};

const padding = {
  bottom: 16,
  left: 32,
  right: 32,
  top: 16,
};

const ReactionsComments = function ReactionsComments({
  dateStart,
  dateEnd,
}) {
  const chartRef = useRef(null);

  const [width, height] = useElementSize(chartRef);

  const { entityType, id: entityId } = useParams();

  const chartHeight = height - padding.bottom - padding.top;
  const chartWidth = width - padding.left - padding.right;

  const { fetch, data, isFetching, error } = useService({
    initialData: {},
    service: service.fetchReactionsComments,
  });

  useEffect(() => {
    if (!dateStart || !dateEnd) {
      return;
    }
    fetch(
      {
        entityType,
        entityId,
        params: { dateStart, dateEnd },
      }
    );
  }, [fetch, dateStart, dateEnd, entityType, entityId]);

  const chartData = useMemo(() => {
    if (!data) {
      return ([]);
    }
    return Object.keys(data).map((date) => ({ ...data[date], date }));
  }, [data]);

  const maxValue = useMemo(() => {
    if (!data || Object.keys(data).length === 0) {
      return 0;
    }
    return Math.max(...Object.keys(data)
      .map((key) => ([data[key].comments, data[key].reposts]))
      .map((d) => Math.max(...d)));
  }, [data]);

  const scaleX = useMemo(() => scaleTime()
    .domain([formatToDate(dateStart), formatToDate(dateEnd)])
    .range([0, chartWidth]), [dateStart, dateEnd, chartWidth]);
  const scaleXBand = useMemo(() => scaleBand()
    .domain(chartData.map((d) => formatToDate(d.date)))
    .range([0, chartWidth])
    .round(true)
    .paddingInner(0.3)
    .paddingOuter(0), [chartData, chartWidth]);
  const scaleY = useMemo(() => scaleLinear()
    .domain([0, maxValue])
    .range([chartHeight, 0]), [chartHeight, maxValue]);

  return (
    <div className={styles.reactionsComments}>
      <div
        ref={chartRef}
        className={styles.reactionsCommentsChart}
      >
        <WithSpinner
          layout="overlay"
          isFetching={isFetching}
          className={styles.spinnerOverlay}
        >
          {error && (
            <ErrorMessage
              error={error}
            />
          )}
          {!error && data && (
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
                  getY={(d) => d.comments || 0}
                  scaleX={scaleX}
                  scaleY={scaleY}
                  scaleXBand={scaleXBand}
                />
              </g>
            </svg>
          )}
        </WithSpinner>
      </div>
    </div>
  );
};

ReactionsComments.propTypes = propTypes;
ReactionsComments.defaultProps = defaultProps;

export default ReactionsComments;
