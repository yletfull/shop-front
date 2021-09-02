import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  field: PropTypes.string.isRequired,
  className: PropTypes.string,
  sortField: PropTypes.string,
  sortDir: PropTypes.oneOf(['asc', 'desc']),
  defaultSortDir: PropTypes.oneOf(['asc', 'desc']),
  onChange: PropTypes.func,
};

const defaultProps = {
  children: '',
  sortField: '',
  sortDir: null,
  defaultSortDir: 'asc',
  className: '',
  onChange: () => {},
};

const SortButton = function SortButton({
  children,
  field,
  sortField,
  sortDir,
  defaultSortDir,
  className,
  onChange,
  ...props
}) {
  const isActive = field === sortField;
  const handleClick = () => {
    let nextSortDir = defaultSortDir;

    if (isActive && sortDir) {
      nextSortDir = sortDir === 'asc' ? 'desc' : 'asc';
    }

    onChange({
      sortField: field,
      sortDir: nextSortDir,
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
      onClick={handleClick}
    >
      {children}
      <span
        className={styles.icons}
      >
        <span
          className={cx([
            styles.icon,
            styles.icon_desc,
            { [styles.current]: sortDir === 'asc' },
          ])}
        />
        <span
          className={cx([
            styles.icon,
            styles.icon_asc,
            { [styles.current]: sortDir === 'desc' },
          ])}
        />
      </span>
    </button>
  );
};

SortButton.propTypes = propTypes;
SortButton.defaultProps = defaultProps;

export default SortButton;
