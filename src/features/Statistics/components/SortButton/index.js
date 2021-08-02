import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const directions = {
  asc: 'asc',
  desc: 'desc',
};

const directionsReverse = {
  asc: 'desc',
  desc: 'asc',
};

const propTypes = {
  children: PropTypes.node,
  isActive: PropTypes.bool,
  field: PropTypes.string,
  direction: PropTypes.string,
  onClick: PropTypes.func,
};

const defaultProps = {
  children: '',
  isActive: false,
  field: '',
  direction: '',
  onClick: () => {},
};

const StatisticsSortButton = function StatisticsSortButton({
  children,
  isActive,
  field,
  direction,
  onClick,
}) {
  const handleImpressionsClick = () => {
    if (!direction || !field) {
      return;
    }

    onClick({
      sortField: field,
      sortDir: isActive ? directionsReverse[direction] : directions[direction],
    });
  };

  return (
    <button
      type="button"
      className={cx([
        { [styles.button_active]: isActive },
        styles.button,
      ])}
      onClick={handleImpressionsClick}
    >
      {children}
      <span
        className={styles.icons}
      >
        <span
          className={cx([
            styles.icon,
            styles.icon_desc,
            { [styles.current]: direction === directions.desc },
          ])}
        />
        <span
          className={cx([
            styles.icon,
            styles.icon_asc,
            { [styles.current]: direction === directions.asc },
          ])}
        />
      </span>
    </button>
  );
};

StatisticsSortButton.propTypes = propTypes;
StatisticsSortButton.defaultProps = defaultProps;

export default StatisticsSortButton;
