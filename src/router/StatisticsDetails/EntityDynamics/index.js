import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  getEntityDynamicsData,
  getEntityDynamicsMeta,
} from '../selectors';
import { lines, linesLabels, linesFactors } from './constants';
import Chart from './Chart';
import styles from './styles.module.scss';

const propTypes = {
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
};

const defaultProps = {};

const EntityDynamics = function EntityDynamics({
  dateStart,
  dateEnd,
}) {
  const data = useSelector(getEntityDynamicsData);
  const meta = useSelector(getEntityDynamicsMeta);

  const [visibleLines, setVisibleLines] = useState(Object.values(lines));

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
      <Chart
        data={data}
        meta={meta}
        dateStart={dateStart}
        dateEnd={dateEnd}
        lines={visibleLines}
      />
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
