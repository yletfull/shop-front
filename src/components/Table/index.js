import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const propTypes = {
  header: PropTypes.node,
  children: PropTypes.node,
  footer: PropTypes.node,
  className: PropTypes.string,
};
const defaultProps = {
  header: null,
  children: null,
  footer: null,
  className: '',
};

const Table = function Table({
  header,
  children,
  footer,
  className,
  ...props
}) {
  return (
    <div className={cx(styles.wrapper, className)}>
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
