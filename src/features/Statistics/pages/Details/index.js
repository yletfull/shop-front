import React, { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import dayjs from '@/utils/day';
import AppMain from '@/components/AppMain';
import WithSpinner from '@/components/WithSpinner';
import DateInputs from '@/features/Statistics/components/DateInputs';
import { useService } from '@/hooks';
import Grid, { GridCell } from '@/components/Grid';
import { entities, segmentsStatisticTitles } from '../../constants';
import { colors, platformsData } from './constants';
import Lists from './components/Lists';
import ChartContainer from './components/ChartContainer';
import EntityDynamics from './components/EntityDynamics';
import EntityValue from './components/EntityValue';
import ReactionsComments from './components/ReactionsComments';
import ReactionsTonality from './components/ReactionsTonality';
import ReactionsTotal from './components/ReactionsTotal';
import service from './service';
import styles from './styles.module.scss';

const StatisticsDetails = function StatisticsDetailsPage() {
  const today = dayjs().format('YYYY-MM-DD');
  const history = useHistory();
  const { entityType, id: entityId } = useParams();
  const location = useLocation();

  const locationSearch = location.search;
  const query = new URLSearchParams(locationSearch);

  const { fetch, isFetching, data } = useService({
    initialData: [],
    service: service.fetchPeriods,
  });

  const { datestart, dateend } = data[0] || {};

  const dateStart = query.get('dateStart') || query.get('listDateStart') || today;
  const dateEnd = query.get('dateEnd') || query.get('listDateEnd') || today;

  const searchQuery = new URLSearchParams('');
  searchQuery.set('dateEnd', dateEnd);
  searchQuery.set('dateStart', dateStart);

  const handleDateInputsSubmit = (dates) => {
    query.set('dateStart', dates.dateStart);
    query.set('dateEnd', dates.dateEnd);
    history.push({ search: query.toString() });
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


  const getPlatformsData = () => {
    if (entityType === entities.platforms) {
      return [platformsData[entityId]];
    }
    return Object.values(platformsData);
  };

  return (
    <WithSpinner
      isFetching={isFetching}
    >
      <AppMain
        header={(
          <div
            className={styles.header}
          >
            <div className={styles.header_title}>
              {segmentsStatisticTitles[entityType]}
            </div>
            <div className={styles.statisticsDetailsHeader}>
              <EntityValue
                entityId={String(entityId)}
              />
              &nbsp;
              <DateInputs
                className={styles.dateInputs}
                min={datestart}
                max={dateend}
                values={{
                  dateStart,
                  dateEnd,
                }}
                onChange={handleDateInputsSubmit}
              />
            </div>
          </div>
        )}
      >
        <Grid inset>
          <GridCell
            columns={12}
            rows={23}
            style={{ padding: 0 }}
          >
            <ChartContainer
              header="Открутки"
            >
              <EntityDynamics
                dateStart={dateStart}
                dateEnd={dateEnd}
              />
            </ChartContainer>
          </GridCell>

          <GridCell
            columns={4}
          >
            <ChartContainer
              header={(
                <span>
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
          </GridCell>

          <GridCell
            columns={4}
          >
            <ChartContainer
              header={(
                <span>
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
          </GridCell>

          <GridCell
            columns={4}
          >
            <ChartContainer
              header="Всего соцреакций"
            >
              <ReactionsTotal
                dateStart={dateStart}
                dateEnd={dateEnd}
              />
            </ChartContainer>
          </GridCell>

          {getPlatformsData().map((platform) => (
            <GridCell
              columns={4}
              rows={23}
              key={platform.id}
            >
              <ChartContainer
                header={platform.header}
              >
                <platform.Component
                  dateStart={dateStart}
                  dateEnd={dateEnd}
                />
              </ChartContainer>
            </GridCell>
          ))}


        </Grid>

        {entityType && entityId && (
          <div className={styles.statisticsDetailsCharts} />
        )}

        {entityType && (
          <Lists
            dateStart={dateStart}
            dateEnd={dateEnd}
          />
        )}
      </AppMain>
    </WithSpinner>
  );
};

export default StatisticsDetails;
