import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  color: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.value,
  ]).isRequired,
};

const defaultProps = {
  color: 'transparent',
};

const Row = function Row({
  color,
  value,
  ...props
}) {
  return (
    <div
      className={styles.row}
      {...props}
    >
      <div
        className={styles.rowRectangle}
        style={{
          backgroundColor: color,
        }}
      />
      &nbsp;
      {value ?? 'Нет данных'}
    </div>

  );
};

Row.propTypes = propTypes;
Row.defaultProps = defaultProps;

export default Row;
