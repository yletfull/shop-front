import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  header: PropTypes.node,
  children: PropTypes.node,
};
const defaultProps = {
  header: null,
  children: null,
};

const Table = function Table({
  header,
  children,
  ...props
}) {
  return (
    <div className={styles.wrapper}>
      <table
        className={styles.table}
        {...props}
      >
        {Boolean(header) && (
          <thead>
            {header}
          </thead>
        )}
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export { default as TableRow } from './TableRow';
export { default as TableCell } from './TableCell';
export default Table;
