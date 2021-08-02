import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useDrop } from 'react-dnd';
import { dndTypes } from '../../constants';
import styles from './styles.module.scss';

const propTypes = {
  group: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  align: PropTypes.oneOf(['start', 'middle', 'end']),
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  className: PropTypes.string,
  onDrop: PropTypes.func.isRequired,
};
const defaultProps = {
  align: 'middle',
  className: '',
  isFirst: false,
  isLast: false,
};

const DropArea = function DropArea({
  group,
  index,
  align,
  isFirst,
  isLast,
  className,
  onDrop,
  ...props
}) {
  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: dndTypes.condition,
    drop: (source) => onDrop([group, index], source?.from || [], source),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={dropRef}
      className={cx(
        styles.dropArea,
        styles[`align-${align}`],
        className,
      )}
      data-can-drop={String(canDrop)}
      data-is-over={String(isOver)}
      data-is-first={String(isFirst)}
      data-is-last={String(isLast)}
      {...props}
    >
      <div className={styles.dropAreaOverlay} />
    </div>
  );
};

DropArea.propTypes = propTypes;
DropArea.defaultProps = defaultProps;

export default DropArea;
