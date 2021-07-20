import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import IconCaretDown from '@/icons/CaretDown';
import IconCaretUp from '@/icons/CaretUp';
import styles from './styles.module.scss';

const directions = {
  asc: 'asc',
  desc: 'desc',
};

const directionsReverse = {
  asc: 'desc',
  desc: 'asc',
};

const sortIcons = {
  [directions.asc]: <IconCaretDown className={styles.sort_icon} />,
  [directions.desc]: <IconCaretUp className={styles.sort_icon} />,
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

const SortButton = function SortButton({
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
      sortDir: directionsReverse[direction],
    });
  };

  return (
    <button
      type="button"
      className={cx([
        { [styles.sort_active]: isActive },
        styles.sort,
      ])}
      onClick={handleImpressionsClick}
    >
      {children}
      {isActive
        ? sortIcons[direction]
        : sortIcons[directions.asc]}
    </button>
  );
};

SortButton.propTypes = propTypes;
SortButton.defaultProps = defaultProps;

export default SortButton;
