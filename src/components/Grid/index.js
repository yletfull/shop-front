import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import __ from './custom-properties';

const propTypes = {
  inset: PropTypes.bool,
  children: PropTypes.node.isRequired,
  style: PropTypes.objectOf(PropTypes.any),
};
const defaultProps = {
  inset: false,
  style: {},
};

const Grid = function Grid({ inset, children, style, ...props }) {
  const outerGap = inset ? 1.5 : 0;
  const margin = `0 ${-0.5 * outerGap * __.gridRowGap}em ${-1 * __.gridRowGap}em`;

  return (
    <div
      className={styles.wrapper}
      style={{
        ...style,
        margin,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

export { default as GridCell } from './Cell';

export default Grid;
