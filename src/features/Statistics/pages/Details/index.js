import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import dayjs from '@/utils/day';
import AppMain from '@/components/AppMain';
import WithSpinner from '@/components/WithSpinner';
import DateInputs from '@/features/Statistics/components/DateInputs';
import { useService, useQueryParams } from '@/hooks';
import Spinner from '@/components/Spinner';
import Grid, { GridCell } from '@/components/Grid';
import { entities } from '../../constants';
import { colors, platformsData, platformsDetailsTitles } from './constants';
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
  const { entityType, entityId } = useParams();
  const location = useLocation();

  const locationSearch = location.search;

  const [hasTimeout, setHasTimeout] = useState(false);
  const [query, setQueryParams] = useQueryParams();
  const [localDetailsState, setLocalDetailsState] = useState(query);

  useEffect(() => {
    if (hasTimeout) {
      const timeout = setTimeout(() => {
        setQueryParams(localDetailsState);
      }, 900);

      return () => {
        setHasTimeout(false);
        clearTimeout(timeout);
      };
    }

    setQueryParams(localDetailsState);
  }, [setQueryParams, setHasTimeout, localDetailsState, hasTimeout]);

  const { fetch, isFetching, data } = useService({
    initialData: [],
    service: service.fetchPeriods,
  });

  const {
    dateStart: minDate,
    dateEnd: maxDate,
  } = data[0] || {};

  const dateStart = query.dateStart || today;
  const dateEnd = query.dateEnd || today;

  const handleDateInputsChange = (dates) => {
    setLocalDetailsState((prevQueryState) => (
      {
        ...prevQueryState,
        dateStart: dates.dateStart,
        dateEnd: dates.dateEnd,
      }
    ));
    setHasTimeout(true);
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


  const [platforms, setPlatforms] = useState(Object.values(platformsData));
  useEffect(() => {
    if (entityType === entities.platforms) {
      return setPlatforms([platformsData[entityId]]);
    }
    setPlatforms(Object.values(platformsData));
  }, [entityId, entityType]);

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
              {platformsDetailsTitles[entityType]}
            </div>
            <div className={styles.statisticsDetailsHeader}>
              <EntityValue
                entityId={String(entityId)}
              />
              &nbsp;
              <DateInputs
                className={styles.dateInputs}
                min={minDate}
                max={maxDate}
                values={{
                  dateStart: localDetailsState.dateStart,
                  dateEnd: localDetailsState.dateEnd,
                }}
                onChange={handleDateInputsChange}
              />
              {hasTimeout && (
                <Spinner
                  className={styles.spinnerDates}
                  layout="inline"
                />
              )}
            </div>
          </div>
        )}
        headerType="sticky"
      >
        <Grid inset>
          <GridCell
            columns={12}
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

          {platforms.map((platform) => (
            <GridCell
              columns={4}
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

        <div className={styles.statisticsDetailsCharts} />

        <Lists
          dateStart={dateStart}
          dateEnd={dateEnd}
        />

      </AppMain>
    </WithSpinner>
  );
};

export default StatisticsDetails;
