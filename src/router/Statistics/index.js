import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { formatDate } from '@/utils/format';
import dayjs from '@/utils/day';
import { useQuery } from '@/hooks';
import { setHeader } from '@/store/ui/actions';
import DateInputs from './components/DateInputs';
import RouterView from './RouterView';
import { paths, titles } from './routes';
import styles from './styles.module.scss';

const DATE_FORMAT = 'YYYY-MM-DD';

const propTypes = {
  defaultTitle: PropTypes.string,
};

const defaultProps = {
  defaultTitle: '',
};

const Statistics = function StatisticsScreen({ defaultTitle }) {
  const dispatch = useDispatch();

  const query = useQuery();

  const [params, setParams] = useState({
    dateStart: query.get('dateStart') || formatDate(dayjs().subtract(6, 'month'), DATE_FORMAT),
    dateEnd: query.get('dateEnd') || formatDate(dayjs(), DATE_FORMAT),
  });

  const handleDateInputsSubmit = (values) => setParams(values);

  useEffect(() => {
    dispatch(setHeader(defaultTitle));
  }, [dispatch, defaultTitle]);

  return (
    <div>
      <DateInputs
        className={styles.dateInputs}
        dateStart={params.dateStart}
        dateEnd={params.dateEnd}
        onSubmit={handleDateInputsSubmit}
      />
      <div className="nav-links-wrapper">
        {Object.keys(paths)
          .map((key) => (
            <NavLink
              key={key}
              to={paths[key]}
              className="link-class_nav"
              activeClassName="active-link-class_nav"
            >
              {titles[key]}
            </NavLink>
          ))}
      </div>
      <RouterView
        dateStart={params.dateStart}
        dateEnd={params.dateEnd}
      />
    </div>
  );
};

Statistics.propTypes = propTypes;
Statistics.defaultProps = defaultProps;

export default Statistics;
