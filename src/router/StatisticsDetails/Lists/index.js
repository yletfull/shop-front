import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const propTypes = {
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
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
  const { entityType } = useParams();

  const navigations = Object.keys(titles)
    .filter((key) => key !== entityType);

  const [currentEntity, setCurrentEntity] = useState(navigations[0]);

  const handleNavigationClick = (e) => {
    const { entity } = e.target.dataset;

    if (!entity) {
      return;
    }

    setCurrentEntity(entity);
  };

  return (
    <div className={styles.wrapper}>
      <nav
        role="presentation"
        className="nav-links-wrapper"
        onClick={handleNavigationClick}
      >
        {navigations
          .map((navigation) => (
            <button
              key={navigation}
              type="button"
              className={cx([
                styles.navigation,
                {
                  [styles.active]: navigation === currentEntity,
                  [styles.hide]: navigation === entityType,
                },
              ])}
              data-entity={navigation}
            >
              {titles[navigation]}
            </button>
          ))}
      </nav>
    </div>
  );
};

Lists.propTypes = propTypes;

export default Lists;
