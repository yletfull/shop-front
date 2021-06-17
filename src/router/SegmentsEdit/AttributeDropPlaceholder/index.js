import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import cx from 'classnames';
import styles from './styles.module.scss';

const propTypes = {
  accept: PropTypes.string.isRequired,
  position: PropTypes.oneOf([
    'top',
    'bottom',
  ]).isRequired,
  onDrop: PropTypes.func,
};

const defaultProps = {
  onDrop: () => {},
};

const AttributeDropPlaceholder = function AttributeDropPlaceholder({
  accept,
  position,
  onDrop,
}) {
  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={dropRef}
      className={cx(
        styles.attributeDropPlaceholder,
        (canDrop ? styles.attributeDropPlaceholder_droppable : ''),
        (isOver ? styles.attributeDropPlaceholder_over : ''),
      )}
      style={{
        bottom: position === 'top' ? '100%' : 'unset',
        top: position === 'bottom' ? '100%' : 'unset',
      }}
    />
  );
};

AttributeDropPlaceholder.propTypes = propTypes;
AttributeDropPlaceholder.defaultProps = defaultProps;

export default AttributeDropPlaceholder;
