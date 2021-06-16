import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import Button from '@/components/Button';
import IconArrows from '@/icons/ArrowsLight';
import IconTimes from '@/icons/TimesLight';
import AttributeEnum from './AttributeEnum';
import AttributeNumber from './AttributeNumber';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  data: PropTypes.shape({
    attributeName: PropTypes.string,
    negation: PropTypes.bool,
    maxValue: PropTypes.string,
    minValue: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
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
  properties: PropTypes.objectOf(PropTypes.string).isRequired,
  types: PropTypes.shape({
    date: PropTypes.string,
    enum: PropTypes.string,
    number: PropTypes.string,
    segment: PropTypes.string,
    string: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  onSubmit: PropTypes.func,
};

const defaultProps = {
  children: null,
  data: {},
  onChange: () => {},
  onRemove: () => {},
  onSubmit: () => {},
};

const Attribute = function Attribute({
  children,
  data,
  dragType,
  groupIndex,
  index,
  properties,
  types,
  onChange,
  onRemove,
  onSubmit,
}) {
  const { attributeName: name, negation, title, type } = data || {};

  const attributes = {
    [types.enum || 'ENUM']: AttributeEnum,
    [types.string || 'STRING']: AttributeEnum,
    [types.number || 'NUMERIC']: AttributeNumber,
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
  const handleClickChangeEquality = () => {
    const key = properties.negation || 'negation';
    onChange([groupIndex, index], { ...data, [key]: !negation });
  };
  const handleClickCloseAttribute = (e) => {
    const { index: attributeIndex, group } = e?.target?.dataset || {};
    if (typeof attributeIndex === 'undefined'
      || typeof group === 'undefined') {
      return;
    }
    onRemove([group, attributeIndex]);
  };
  const handleSubmitAttribute = (values) => {
    onSubmit([groupIndex, index], values);
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

        <div className={styles.attributeSection}>
          <Button
            appearance="control"
            className={styles.attributeEquality}
            onClick={handleClickChangeEquality}
          >
            {negation ? '≠' : '='}
          </Button>
        </div>

        <div className={styles.attributeSection}>
          {!TypedAttribute && (
            <span className={styles.attributeMessage}>
              Неизвестный тип аттрибута
            </span>
          )}
          {TypedAttribute && (
            <TypedAttribute
              data={data}
              className={styles.attribute}
              properties={properties}
              onChange={handleChangeAttribute}
              onSubmit={handleSubmitAttribute}
            >
              {children}
            </TypedAttribute>
          )}
        </div>
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
