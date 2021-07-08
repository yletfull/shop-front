import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
const defaultProps = {
  className: '',
  children: null,
};

const TableRow = function TableRow({
  className,
  children,
}) {
  return (
    <tr
      className={cx(
        className,
        styles.row,
      )}
    >
      {children}
    </tr>
  );
};

TableRow.propTypes = propTypes;
TableRow.defaultProps = defaultProps;

export default TableRow;
