import React, { Fragment, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useService } from '@/hooks';
import InputCheckbox from '@/components/InputCheckbox';
import WithSpinner from '@/components/WithSpinner';
import ErrorMessageBlock from '@/components/ErrorMessageBlock';
import { lines, linesLabels, linesFactors } from './constants';
import Chart from './Chart';
import service from './service';
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
  const [visibleLines, setVisibleLines] = useState(Object.values(lines));
  const { entityType, entityId } = useParams();

  const { fetch, data, isFetching, error } = useService({
    initialData: {},
    service: service.fetchEntityDynamics,
  });

  useEffect(() => {
    if (!dateStart || !dateEnd) {
      return;
    }
    const params = { dateStart, dateEnd };
    fetch({ entityType, entityId, params });
  }, [fetch, dateStart, dateEnd, entityType, entityId]);

  const chartData = useMemo(() => {
    if (!data || Object.keys(data).length === 0) {
      return [];
    }
    return Object.keys(data).map((key) => ({
      ...data[key],
      date: data[key]?.date || key,
    }));
  }, [data]);

  const chartMeta = useMemo(() => {
    if (!data || Object.keys(data).length === 0) {
      return ({
        maxValue: 0,
      });
    }
    return ({
      maxValue: Math.max(...Object.values(data)
        .map((values) => Math.max(...Object.keys(values)
          .map((key) => (
            visibleLines.includes(key)
              ? Number(values[key]) * (linesFactors[key] || 1)
              : 0
          ))))),
    });
  }, [data, visibleLines]);

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
      <WithSpinner
        layout="block"
        isFetching={isFetching}
      >
        {error && (
          <ErrorMessageBlock error={error} />
        )}
        {!error && data && (
          <Fragment>
            {!visibleLines.length
              ? (
                <p className={styles.stub}>
                  Выберите данные для отображения
                </p>
              )
              : (
                <Chart
                  data={chartData}
                  meta={chartMeta}
                  dateStart={dateStart}
                  dateEnd={dateEnd}
                  lines={visibleLines}
                />
              )}
            <div className={styles.entityDynamicsLegend}>
              {Object.values(lines).map((key) => (
                <InputCheckbox
                  key={key}
                  name={key}
                  data-line={key}
                  className={styles.entityDynamicsLegendCheckbox}
                  checked={visibleLines.includes(key)}
                  onChange={handleChangeCheckbox}
                >
                  {linesLabels[key]}
                </InputCheckbox>
              ))}
            </div>
          </Fragment>
        )}
      </WithSpinner>
    </div>
  );
};

EntityDynamics.propTypes = propTypes;
EntityDynamics.defaultProps = defaultProps;

export default EntityDynamics;
