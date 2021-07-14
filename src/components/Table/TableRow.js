import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf([
    'default',
    'header',
    'summary',
  ]),
  children: PropTypes.node,
};
const defaultProps = {
  className: '',
  type: 'default',
  children: null,
};

const TableRow = function TableRow({
  className,
  type,
  children,
  ...props
}) {
  return (
    <tr
      {...props}
      className={cx(
        className,
        styles.row,
        styles[`row_type-${type}`],
      )}
    >
      {children}
    </tr>
  );
};

TableRow.propTypes = propTypes;
TableRow.defaultProps = defaultProps;

export default TableRow;
