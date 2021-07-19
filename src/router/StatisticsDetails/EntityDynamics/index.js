import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { scaleLinear, scaleTime } from 'd3-scale';
import { useElementSize } from '@/hooks';
import { formatToDate } from '@/utils/format';
import { XYLine } from '@/components/charts';
import {
  getEntityDynamicsData,
  getEntityDynamicsMeta,
} from '../selectors';
import styles from './styles.module.scss';

const propTypes = {
  header: PropTypes.node,
};

const defaultProps = {
  header: null,
};

const EntityDynamics = function EntityDynamics({ header }) {
  const chartRef = useRef(null);

  const data = useSelector(getEntityDynamicsData);
  const meta = useSelector(getEntityDynamicsMeta);

  const [width, height] = useElementSize(chartRef);

  const scaleX = useMemo(() => scaleTime()
    .domain([
      formatToDate('2020-07-18'),
      formatToDate('2021-07-19'),
    ])
    .range([0, width]), [width]);
  const scaleY = useMemo(() => scaleLinear()
    .domain([0, meta.maxValue])
    .range([height, 0]), [height, meta]);

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
        style={{
          height: '200px',
          width: '100%',
        }}
      >
        <svg
          height={height}
          width={width}
          viewBox={`0 0 ${width} ${height}`}
        >
          <XYLine
            data={data}
            getX={(d) => formatToDate(d.date)}
            getY={(d) => d.impressions}
            scaleX={scaleX}
            scaleY={scaleY}
            stroke="#ff0000"
          />
          <XYLine
            data={data}
            getX={(d) => formatToDate(d.date)}
            getY={(d) => (d.clicks * 100)}
            scaleX={scaleX}
            scaleY={scaleY}
            stroke="#00ff00"
          />
          <XYLine
            data={data}
            getX={(d) => formatToDate(d.date)}
            getY={(d) => (Number(d.ctr) * 1000000000)}
            scaleX={scaleX}
            scaleY={scaleY}
            stroke="#0000ff"
          />
        </svg>
      </div>
    </div>
  );
};

EntityDynamics.propTypes = propTypes;
EntityDynamics.defaultProps = defaultProps;

export default EntityDynamics;
