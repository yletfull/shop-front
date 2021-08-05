import React, { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import dayjs from '@/utils/day';
import AppMain from '@/components/AppMain';
import DateInputs from '@/features/Statistics/components/DateInputs';
import { useService } from '@/hooks';
import { colors } from './constants';
import Lists from './Lists';
import ChartContainer from './ChartContainer';
import EntityDynamics from './EntityDynamics';
import EntitySelect from './EntitySelect';
import ReactionsComments from './ReactionsComments';
import ReactionsTonality from './ReactionsTonality';
import ReactionsTotal from './ReactionsTotal';
import ReactionsFacebook from './ReactionsFacebook';
import ReactionsVkontakte from './ReactionsVkontakte';
import ReactionsInstagram from './ReactionsInstagram';
import service from './service';
import styles from './styles.module.scss';

const StatisticsDetails = function StatisticsDetails() {
  const today = dayjs().format('YYYY-MM-DD');
  const history = useHistory();
  const { entityType, id: entityId } = useParams();
  const location = useLocation();

  const locationSearch = location.search;
  const query = new URLSearchParams(locationSearch);

  const { fetch, data } = useService({
    initialData: [],
    service: service.fetchPeriods,
  });

  const { datestart } = data[0] || {};

  const dateStart = query.get('dateStart') || today;
  const dateEnd = query.get('dateEnd') || today;

  const searchQuery = new URLSearchParams('');
  searchQuery.set('dateEnd', dateEnd);
  searchQuery.set('dateStart', dateStart);

  const handleDateInputsSubmit = (dates) => {
    query.set('dateStart', dates.dateStart);
    query.set('dateEnd', dates.dateEnd);
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

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    const newQuery = new URLSearchParams(locationSearch);
    const queryDateStart = newQuery.get('dateStart');
    const queryDateEnd = newQuery.get('dateEnd');
    if ((queryDateStart && queryDateEnd)
    || !(dateStart && dateEnd)) {
      return;
    }
    if (!queryDateEnd) {
      newQuery.set('dateEnd', dateEnd);
    }
    if (!queryDateStart) {
      newQuery.set('dateStart', dateStart);
    }
    history.push({ search: newQuery.toString() });
  }, [locationSearch, history, dateStart, dateEnd]);


  return (
    <AppMain
      header={(
        <div
          className={styles.header}
        >
          <div
            className={styles.header_title}
          >
            Статистика по задаче
          </div>
          <div className={styles.statisticsDetailsHeader}>
            <EntitySelect
              selected={String(entityId)}
              onChange={handleChangeSelectedEntity}
            />
            &nbsp;
            <DateInputs
              className={styles.dateInputs}
              min={datestart}
              values={{
                dateStart,
                dateEnd,
              }}
              onChange={handleDateInputsSubmit}
              onShift={handleDateInputsSubmit}
              onSelect={handleDateInputsSubmit}
            />
          </div>
        </div>
      )}
    >
      <div className={styles.statisticsDetails}>
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
                dateStart={dateStart}
                dateEnd={dateEnd}
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
                dateStart={dateStart}
                dateEnd={dateEnd}
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
                dateStart={dateStart}
                dateEnd={dateEnd}
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
                dateStart={dateStart}
                dateEnd={dateEnd}
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
                dateStart={dateStart}
                dateEnd={dateEnd}
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
                dateStart={dateStart}
                dateEnd={dateEnd}
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
                dateStart={dateStart}
                dateEnd={dateEnd}
              />
            </ChartContainer>
          </div>
        )}
        {entityType && (
          <Lists
            dateStart={dateStart}
            dateEnd={dateEnd}
          />
        )}
      </div>
    </AppMain>
  );
};

export default StatisticsDetails;
