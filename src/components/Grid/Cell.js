import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import __ from './custom-properties';

const propTypes = {
  columns: PropTypes.number,
  rows: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.node,
};
const defaultProps = {
  columns: 12,
  rows: 10,
  className: '',
  style: {},
  children: null,
};

const GridCell = function GridCell({
  className,
  style,
  children,
  columns,
  rows,
  ...props
}) {
  const minHeight = `${__.gridRowBasis * rows + __.gridRowGap}em`;
  const padding = `0 ${0.5 * __.gridColumnGap}em ${__.gridRowGap}em`;
  const width = `${__.gridColBasis * columns}%`;

  return (
    <div
      className={[styles.cell, className].join(' ')}
      style={{
        ...style,
        minHeight,
        padding: style.padding || padding,
        width: style.width || width,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

GridCell.propTypes = propTypes;
GridCell.defaultProps = defaultProps;

export default GridCell;
