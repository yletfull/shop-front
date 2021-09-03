import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ScreenControler from './ScreenControler';
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

  useEffect(() => {
    if (entityType === currentEntity) {
      setCurrentEntity(navigations[0]);
    }
  }, [entityType, currentEntity, navigations]);

  return (
    <div className={styles.wrapper}>
      <nav
        role="presentation"
        className={cx([
          styles.navigations,
          'nav-links-wrapper',
        ])}
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
      <ScreenControler
        entity={currentEntity}
        dateStart={dateStart}
        dateEnd={dateEnd}
      />
    </div>
  );
};

Lists.propTypes = propTypes;

export default Lists;
