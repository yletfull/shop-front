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

const TableCell = function TableCell({
  className,
  children,
}) {
  return (
    <td
      className={cx(
        className,
        styles.cell,
      )}
    >
      {children}
    </td>
  );
};

TableCell.propTypes = propTypes;
TableCell.defaultProps = defaultProps;

export default TableCell;
