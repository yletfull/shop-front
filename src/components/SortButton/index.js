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
  hideSpacer: PropTypes.bool,
  iconsAlign: PropTypes.oneOf(['left', 'right']),
  onChange: PropTypes.func,
};

const defaultProps = {
  children: '',
  sortField: '',
  sortDir: null,
  defaultSortDir: 'asc',
  className: '',
  hideSpacer: false,
  iconsAlign: 'right',
  onChange: () => {},
};

const SortButton = function SortButton({
  children,
  field,
  sortField,
  sortDir,
  defaultSortDir,
  className,
  hideSpacer,
  iconsAlign,
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
      data-active={String(isActive)}
      data-align={String(iconsAlign)}
      className={cx(styles.button, className)}
      onClick={handleClick}
    >
      {!hideSpacer && <span className={styles.spacer} />}

      <span className={styles.content}>
        {children}
      </span>

      <span className={styles.icons}>
        {(isActive || defaultSortDir === 'asc') && (
          <span
            data-type="asc"
            data-active={String(isActive && sortDir === 'asc')}
            className={styles.icon}
          />
        )}
        {(isActive || defaultSortDir === 'desc') && (
          <span
            data-type="desc"
            data-active={String(isActive && sortDir === 'desc')}
            className={styles.icon}
          />
        )}
      </span>
    </button>
  );
};

SortButton.propTypes = propTypes;
SortButton.defaultProps = defaultProps;

export default SortButton;
