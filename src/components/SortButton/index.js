import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const directions = {
  asc: 'asc',
  desc: 'desc',
};

const directionsReverse = {
  [directions.asc]: directions.desc,
  [directions.desc]: directions.asc,
};

const propTypes = {
  children: PropTypes.node,
  isActive: PropTypes.bool,
  field: PropTypes.string,
  direction: PropTypes.oneOf([
    directions.asc,
    directions.desc,
  ]),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

const defaultProps = {
  children: '',
  isActive: false,
  field: '',
  direction: null,
  className: '',
  onClick: () => {},
};

const SortButton = function SortButton({
  children,
  isActive,
  field,
  direction,
  className,
  onClick,
  ...props
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
      {...props}
      type="button"
      className={cx([
        { [styles.button_active]: isActive },
        styles.button,
        className,
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

SortButton.propTypes = propTypes;
SortButton.defaultProps = defaultProps;

export default SortButton;
