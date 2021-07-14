import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  header: PropTypes.node,
  children: PropTypes.node,
  footer: PropTypes.node,
};
const defaultProps = {
  header: null,
  children: null,
  footer: null,
};

const Table = function Table({
  header,
  children,
  footer,
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
        {Boolean(footer) && (
          <tfoot>
            {footer}
          </tfoot>
        )}
      </table>
    </div>
  );
};

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export { default as TableRow } from './TableRow';
export { default as TableCell } from './TableCell';
export default Table;
