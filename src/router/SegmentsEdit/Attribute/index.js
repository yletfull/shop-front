import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import IconArrows from '@/icons/ArrowsLight';
import IconTimes from '@/icons/TimesLight';
import AttributeEnum from './AttributeEnum';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  data: PropTypes.shape({
    attributeName: PropTypes.string,
    maxValue: PropTypes.string,
    minValue: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
    })),
    profileId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    title: PropTypes.string,
    type: PropTypes.string,
  }),
  dragType: PropTypes.string.isRequired,
  groupIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
};

const defaultProps = {
  children: null,
  data: {},
  onChange: () => {},
  onRemove: () => {},
};

const Attribute = function Attribute({
  children,
  data,
  dragType,
  groupIndex,
  index,
  onChange,
  onRemove,
}) {
  const { attributeName: name, title, type } = data || {};

  const types = {
    enum: 'ENUM',
    string: 'STRING',
  };

  const attributes = {
    [types.enum]: AttributeEnum,
    [types.string]: AttributeEnum,
  };

  const TypedAttribute = type && attributes[type] ? attributes[type] : null;

  const [{ opacity }, dragRef] = useDrag(() => ({
    type: dragType,
    item: { from: [groupIndex, index] },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  }), [dragType, groupIndex, index]);

  const handleChangeAttribute = (key, values) => {
    if (!key) {
      return;
    }
    onChange({ ...data, [key]: values });
  };
  const handleClickCloseAttribute = (e) => {
    const { index: attributeIndex, group } = e?.target?.dataset || {};
    if (typeof attributeIndex === 'undefined'
      || typeof group === 'undefined') {
      return;
    }
    onRemove([group, attributeIndex]);
  };

  return (
    <div
      ref={dragRef}
      className={styles.attribute}
      style={{ opacity }}
    >
      <div className={styles.attributeAside}>
        <span className={styles.attributeIcon}>
          <IconArrows />
        </span>
      </div>

      <div className={styles.attributeMain}>
        <div className={styles.attributeSection}>
          <span className={styles.attributeTitle}>
            {title || name}
          </span>
        </div>

        {!TypedAttribute && (
          <span className={styles.attributeMessage}>
            Неизвестный тип аттрибута
          </span>
        )}
        {TypedAttribute && (
          <TypedAttribute
            data={data}
            className={styles.attribute}
            onChange={handleChangeAttribute}
          >
            {children}
          </TypedAttribute>
        )}
      </div>

      <div className={styles.attributeAside}>
        <button
          type="button"
          data-group={groupIndex}
          data-index={index}
          className={styles.attributeButton}
          onClick={handleClickCloseAttribute}
        >
          <span className={styles.attributeIcon}>
            <IconTimes />
          </span>
        </button>
      </div>
    </div>
  );
};

Attribute.propTypes = propTypes;
Attribute.defaultProps = defaultProps;

export default Attribute;
