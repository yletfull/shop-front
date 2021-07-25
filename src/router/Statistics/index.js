import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { useService } from '@/hooks';
import { setHeader } from '@/store/ui/actions';
import WithSpinner from './components/WithSpinner';
import DateInputs from './components/DateInputs';
import RouterView from './RouterView';
import { paths, titles } from './routes';
import styles from './styles.module.scss';
import service from './service';

const propTypes = {
  defaultTitle: PropTypes.string,
};

const defaultProps = {
  defaultTitle: '',
};

const Statistics = function StatisticsScreen({ defaultTitle }) {
  const dispatch = useDispatch();
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
    dispatch(setHeader(defaultTitle));
  }, [dispatch, defaultTitle]);

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
    <WithSpinner
      layout="block"
      isFetching={isFetching}
      className={styles.spinnerOverlay}
    >
      <DateInputs
        className={styles.dateInputs}
        min={datestart}
        max={dateend}
        dateStart={dateStart}
        dateEnd={dateEnd}
        onSubmit={handleDateInputsSubmit}
      />
      <div className="nav-links-wrapper">
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
  );
};

Statistics.propTypes = propTypes;
Statistics.defaultProps = defaultProps;

export default Statistics;
