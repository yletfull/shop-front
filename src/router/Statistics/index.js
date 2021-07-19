import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setHeader } from '@/store/ui/actions';
import RouterView from './RouterView';
import { paths, titles } from './routes';
// import styles from './styles.module.scss';

const propTypes = {
  defaultTitle: PropTypes.string,
};

const defaultProps = {
  defaultTitle: '',
};

const Statistics = function StatisticsScreen({ defaultTitle }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeader(defaultTitle));
  }, [dispatch, defaultTitle]);

  return (
    <div>
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
      <RouterView />
    </div>
  );
};

Statistics.propTypes = propTypes;
Statistics.defaultProps = defaultProps;

export default Statistics;
