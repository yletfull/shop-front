import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { injectReducer } from '@/store';
import { setHeader } from '@/store/ui/actions';
import { useQuery } from '@/hooks';
import {
  colors,
  namespace as NS,
  queryParams,
} from './constants';
import {
  fetchEntities,
  fetchEntityDynamics,
  fetchPeriods,
  fetchReactionsTonality,
} from './actions';
import reducer from './reducer';
import {
  getIsFetchingPeriods,
  getAvailablePeriods,
} from './selectors';
import ChartContainer from './ChartContainer';
import EntityDateRange from './EntityDateRange';
import EntityDynamics from './EntityDynamics';
import EntitySelect from './EntitySelect';
import ReactionsTonality from './ReactionsTonality';
import styles from './styles.module.scss';

const propTypes = {
  defaultTitle: PropTypes.string,
};

const defaultProps = {
  defaultTitle: '',
};

const StatisticsDetails = function StatisticsDetails({ defaultTitle }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const location = useLocation();

  const { entityType, id: entityId } = useParams();

  const isFetchingPeriods = useSelector(getIsFetchingPeriods);
  const periods = useSelector(getAvailablePeriods);

  const [params, setParams] = useState({
    dateStart: query.get(queryParams.dateStart) || '',
    dateEnd: query.get(queryParams.dateEnd) || '',
  });

  useEffect(() => {
    injectReducer(NS, reducer);
  }, []);

  useEffect(() => {
    dispatch(setHeader(defaultTitle));
  }, [dispatch, defaultTitle]);

  useEffect(() => {
    if (isFetchingPeriods
      || !periods.dateStart
      || !periods.dateEnd
      || params.dateStart
      || params.dateEnd) {
      return;
    }
    setParams({
      dateStart: periods.dateStart,
      dateEnd: periods.dateEnd,
    });
  }, [isFetchingPeriods, params, periods]);

  useEffect(() => {
    dispatch(fetchPeriods());
  }, [dispatch]);

  useEffect(() => {
    if (entityType) {
      dispatch(fetchEntities(entityType));
    }
  }, [dispatch, entityType]);

  useEffect(() => {
    if (entityType && entityId && params.dateStart && params.dateEnd) {
      dispatch(fetchEntityDynamics(entityType, entityId, params));
      dispatch(fetchReactionsTonality(entityType, entityId, params));
    }
  }, [dispatch, entityType, entityId, params]);

  const handleChangeDateRange = (values) => {
    const { dateStart, dateEnd } = values || {};
    if (!dateStart || !dateEnd) {
      return;
    }
    setParams({ ...params, dateStart, dateEnd });
    query.set(queryParams.dateStart, dateStart);
    query.set(queryParams.dateEnd, dateEnd);
    history.push({ search: query.toString() });
  };

  const handleChangeSelectedEntity = (value) => {
    const { pathname } = location || {};
    if (!pathname || typeof value === 'undefined' || value === null) {
      return;
    }
    const lastSlashIndex = pathname.lastIndexOf('/');
    if (lastSlashIndex === (-1)) {
      return;
    }
    const path = pathname.slice(0, lastSlashIndex);
    history.push(`${path}/${value}`);
  };

  return (
    <div className={styles.statisticsDetails}>
      <div className={styles.statisticsDetailsHeader}>
        <EntitySelect
          selected={String(entityId)}
          onChange={handleChangeSelectedEntity}
        />
        &nbsp;
        <EntityDateRange
          dateStart={params.dateStart}
          dateEnd={params.dateEnd}
          onChange={handleChangeDateRange}
        />
      </div>

      {entityType && entityId && (
        <div className={styles.statisticsDetailsCharts}>
          <EntityDynamics
            dateStart={params.dateStart}
            dateEnd={params.dateEnd}
            header={(
              <span className={styles.statisticsDetailsChartHeader}>
                Открутки
              </span>
            )}
          />
          <ChartContainer
            header={(
              <span className={styles.statisticsDetailsChartHeader}>
                Лайки
                &nbsp;
                <span
                  className={styles.statisticsDetailsChartRectangle}
                  style={{
                    background: colors?.tonality?.positive || 'transparent',
                  }}
                />
                &nbsp;
                / Дизлайки
                &nbsp;
                <span
                  className={styles.statisticsDetailsChartRectangle}
                  style={{
                    background: colors?.tonality?.negative || 'transparent',
                  }}
                />
              </span>
            )}
          >
            <ReactionsTonality
              dateStart={params.dateStart}
              dateEnd={params.dateEnd}
            />
          </ChartContainer>
        </div>
      )}
    </div>
  );
};

StatisticsDetails.propTypes = propTypes;
StatisticsDetails.defaultProps = defaultProps;

export default StatisticsDetails;
