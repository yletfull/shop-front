import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
};
const defaultProps = {
  children: null,
};

const Table = function Table({ children }) {
  return (
    <div className={styles.wrapper}>
      <table
        className={styles.table}
      >
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
