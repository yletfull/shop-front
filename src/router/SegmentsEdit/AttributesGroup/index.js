import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import styles from './styles.module.scss';

const propTypes = {
  accept: PropTypes.string.isRequired,
  children: PropTypes.node,
  onDrop: PropTypes.func,
};

const defaultProps = {
  children: null,
  onDrop: () => {},
};

const AttributesGroup = function AttributesGroup({
  accept,
  children,
  onDrop,
}) {
  const [{ isOver }, dropRef] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={dropRef}
      className={styles.attributesGroup}
      style={{
        border: isOver ? 'thin solid #000' : '',
      }}
    >
      {children}
    </div>
  );
};

AttributesGroup.propTypes = propTypes;
AttributesGroup.defaultProps = defaultProps;

export default AttributesGroup;
