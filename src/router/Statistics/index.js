import React, { useEffect } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import cx from 'classnames';
import { useService } from '@/hooks';
import AppMain from '@/components/AppMain';
import WithSpinner from '@/components/WithSpinner';
import DateInputs from '@/components/DateInputs';
import RouterView from './RouterView';
import { paths, titles } from './routes';
import styles from './styles.module.scss';
import service from './service';

const Statistics = function StatisticsScreen() {
  const history = useHistory();

  const locationSearch = useLocation().search;
  const query = new URLSearchParams(locationSearch);

  const { fetch, data, isFetching } = useService({
    initialData: [],
    service: service.fetchPeriods,
  });

  const { datestart, dateend } = data[0] || {};

  const dateStart = query.get('dateStart') || dateend;
  const dateEnd = query.get('dateEnd') || dateend;

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

  console.log(dateStart, dateEnd);

  return (
    <AppMain
      header={(
        <div
          className={styles.header}
        >
          <div
            className={styles.header_title}
          >
            Статистика
          </div>
          <DateInputs
            className={styles.dateInputs}
            min={datestart}
            max={dateend}
            dateStart={dateStart}
            dateEnd={dateEnd}
            onChange={handleDateInputsSubmit}
            onShift={handleDateInputsSubmit}
          />
        </div>
      )}
    >
      <WithSpinner
        layout="block"
        isFetching={isFetching}
        className={styles.spinnerOverlay}
      >
        <div
          className={cx([
            styles.navigation,
            'nav-links-wrapper',
          ])}
        >
          {Object.keys(paths)
            .map((key) => (
              <NavLink
                key={key}
                to={{
                  pathname: paths[key],
                  search: searchQuery.toString(),
                }}
                className="link-class_nav"
                activeClassName="active-link-class_nav"
              >
                {titles[key]}
              </NavLink>
            ))}
        </div>
        <RouterView />
      </WithSpinner>
    </AppMain>
  );
};

export default Statistics;
