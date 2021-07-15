import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useDrop } from 'react-dnd';
import styles from './styles.module.scss';

const propTypes = {
  accept: PropTypes.string.isRequired,
  group: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  align: PropTypes.oneOf(['start', 'middle', 'end']),
  className: PropTypes.string,
  onDrop: PropTypes.func.isRequired,
};
const defaultProps = {
  align: 'middle',
  className: '',
};

const DropArea = function DropArea({
  accept,
  group,
  index,
  align,
  className,
  onDrop,
  ...props
}) {
  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept,
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
        styles.wrapper,
        styles[`align-${align}`],
        className,
      )}
      data-can-drop={String(canDrop)}
      data-is-over={String(isOver)}
      {...props}
    >
      <div className={styles.overlay} />
    </div>
  );
};

DropArea.propTypes = propTypes;
DropArea.defaultProps = defaultProps;

export default DropArea;
