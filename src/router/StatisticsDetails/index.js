import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { setHeader } from '@/store/ui/actions';
import { useQuery } from '@/hooks';
import { colors, queryParams } from './constants';
import Lists from './Lists';
import ChartContainer from './ChartContainer';
import EntityDateRange from './EntityDateRange';
import EntityDynamics from './EntityDynamics';
import EntitySelect from './EntitySelect';
import ReactionsComments from './ReactionsComments';
import ReactionsTonality from './ReactionsTonality';
import ReactionsTotal from './ReactionsTotal';
import ReactionsFacebook from './ReactionsFacebook';
import ReactionsVkontakte from './ReactionsVkontakte';
import ReactionsInstagram from './ReactionsInstagram';
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

  const [params, setParams] = useState({
    dateStart: query.get(queryParams.dateStart) || '',
    dateEnd: query.get(queryParams.dateEnd) || '',
  });

  useEffect(() => {
    dispatch(setHeader(defaultTitle));
  }, [dispatch, defaultTitle]);

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
  const handleChangeDateRangeLimits = (values) => {
    console.log('=============== Change Limits', values);
    if (!values || !values.dateStart || !values.dateEnd) {
      return;
    }
    setParams({
      dateStart: values.dateStart,
      dateEnd: values.dateEnd,
    });
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
          onChangeLimits={handleChangeDateRangeLimits}
        />
      </div>

      {entityType && entityId && (
        <div className={styles.statisticsDetailsCharts}>
          <ChartContainer
            header={(
              <span className={styles.statisticsDetailsChartHeader}>
                Открутки
              </span>
            )}
          >
            <EntityDynamics
              dateStart={params.dateStart}
              dateEnd={params.dateEnd}
            />
          </ChartContainer>
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

          <ChartContainer
            header={(
              <span className={styles.statisticsDetailsChartHeader}>
                Репосты
                &nbsp;
                <span
                  className={styles.statisticsDetailsChartRectangle}
                  style={{
                    background: colors?.commentsAndReposts?.reposts || 'transparent',
                  }}
                />
                &nbsp;
                / Комментарии
                &nbsp;
                <span
                  className={styles.statisticsDetailsChartRectangle}
                  style={{
                    background: colors?.commentsAndReposts?.comments || 'transparent',
                  }}
                />
              </span>
            )}
          >
            <ReactionsComments
              dateStart={params.dateStart}
              dateEnd={params.dateEnd}
              colors={colors.commentsAndReposts}
            />
          </ChartContainer>

          <ChartContainer
            header={(
              <span className={styles.statisticsDetailsChartHeader}>
                Всего соцреакций
              </span>
            )}
          >
            <ReactionsTotal
              dateStart={params.dateStart}
              dateEnd={params.dateEnd}
            />
          </ChartContainer>
          <ChartContainer
            header={(
              <span className={styles.statisticsDetailsChartHeader}>
                Facebook
              </span>
            )}
          >
            <ReactionsFacebook
              dateStart={params.dateStart}
              dateEnd={params.dateEnd}
            />
          </ChartContainer>
          <ChartContainer
            header={(
              <span className={styles.statisticsDetailsChartHeader}>
                vk
              </span>
            )}
          >
            <ReactionsVkontakte
              dateStart={params.dateStart}
              dateEnd={params.dateEnd}
            />
          </ChartContainer>
          <ChartContainer
            header={(
              <span className={styles.statisticsDetailsChartHeader}>
                Instagram
              </span>
            )}
          >
            <ReactionsInstagram
              dateStart={params.dateStart}
              dateEnd={params.dateEnd}
            />
          </ChartContainer>
        </div>
      )}
      {entityType && (
        <Lists />
      )}
    </div>
  );
};

StatisticsDetails.propTypes = propTypes;
StatisticsDetails.defaultProps = defaultProps;

export default StatisticsDetails;
