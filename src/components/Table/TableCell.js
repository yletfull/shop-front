import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  nowrap: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};
const defaultProps = {
  align: 'left',
  nowrap: false,
  className: '',
  children: null,
};

const TableCell = function TableCell({
  align,
  nowrap,
  className,
  children,
  ...props
}) {
  return (
    <td
      {...props}
      className={cx(
        className,
        styles.cell,
        styles[`cell_align-${align}`],
        nowrap && styles.cell_nowrap,
      )}
    >
      {children}
    </td>
  );
};

TableCell.propTypes = propTypes;
TableCell.defaultProps = defaultProps;

export default TableCell;
