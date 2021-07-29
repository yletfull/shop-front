import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// import styles from './styles.module.scss';

const propTypes = {
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
};

const paths = {
  tasks: '/statistics/lists/tasks',
  campaigns: '/statistics/lists/campaigns',
  platforms: '/statistics/lists/platforms',
  sites: '/statistics/lists/sites',
  spheres: '/statistics/lists/spheres',
};

const titles = {
  tasks: 'Задачи',
  campaigns: 'Информационные кампании',
  platforms: 'Каналы',
  sites: 'Сайты',
  spheres: 'Сферы',
};

const Lists = function StatisticsDetailsLists({
  dateStart,
  dateEnd,
}) {
  console.log({
    dateStart,
    dateEnd,
  });
  return (
    <div>
      <div className="nav-links-wrapper">
        {Object.keys(paths)
          .map((key) => (
            <NavLink
              key={key}
              to={{
                pathname: paths[key],
              }}
              className="link-class_nav"
              activeClassName="active-link-class_nav"
            >
              {titles[key]}
            </NavLink>
          ))}
      </div>
    </div>
  );
};

Lists.propTypes = propTypes;

export default Lists;
