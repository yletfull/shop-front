import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import Button from '@/components/Button';
import IconBars from '@/icons/BarsLight';
import IconTimes from '@/icons/TimesLight';
import { getMapProfileTitle } from '../selectors';
import AttributeDate from './AttributeDate';
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
  equalityTypes: PropTypes.objectOf(PropTypes.string).isRequired,
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
  equalityTypes,
  groupIndex,
  index,
  properties,
  types,
  onChange,
  onRemove,
}) {
  const mapProfileTitle = useSelector(getMapProfileTitle);

  const { attributeName: name, negation, title, type } = data || {};

  const attributes = {
    [types.date || 'DATE']: AttributeDate,
    [types.enum || 'ENUM']: AttributeEnum,
    [types.string || 'STRING']: AttributeEnum,
    [types.number || 'NUMERIC']: AttributeNumber,
  };

  const TypedAttribute = type && attributes[type] ? attributes[type] : null;

  const [isDragForbidden, setIsDragForbidden] = useState(true);
  const handleDragAreaMouseover = () => setIsDragForbidden(false);
  const handleDragAreaMouseleave = () => setIsDragForbidden(true);
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: dragType,
    item: { from: [groupIndex, index] },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !isDragForbidden,
  }), [dragType, groupIndex, index, isDragForbidden]);
  useEffect(() => {
    if (!isDragging) {
      return;
    }

    const defaultCursor = document.documentElement.style.cursor;
    document.documentElement.style.cursor = 'grabbing';

    return () => {
      document.documentElement.style.cursor = defaultCursor;
    };
  }, [isDragging]);

  const handleChangeAttribute = (values) => {
    onChange([groupIndex, index], values);
  };
  const handleClickChangeEquality = () => {
    const key = properties.negation || 'negation';
    onChange([groupIndex, index], { ...data, [key]: !negation });
  };
  const handleClickCloseAttribute = () => {
    onRemove([groupIndex, index]);
  };

  return (
    <div
      ref={dragRef}
      className={styles.attribute}
      data-is-dragging={String(isDragging)}
    >
      <div className={styles.attributeAside}>
        <span
          className={cx(
            styles.attributeControl,
            styles.attributeControlDrag,
          )}
          onMouseOver={handleDragAreaMouseover}
          onMouseLeave={handleDragAreaMouseleave}
          onFocus={handleDragAreaMouseover}
          onBlur={handleDragAreaMouseleave}
        >
          <IconBars />
        </span>
      </div>

      <div className={styles.attributeMain}>
        <div className={styles.attributeSection}>
          <span className={styles.attributeTitle}>
            {title || name}
          </span>
          {Boolean(mapProfileTitle && mapProfileTitle[data.profileId]) && (
            <div
              className={styles.attributeProfile}
              title={mapProfileTitle[data.profileId]}
            >
              {mapProfileTitle[data.profileId]}
            </div>
          )}
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
              equalityTypes={equalityTypes}
              onChange={handleChangeAttribute}
            >
              {children}
            </TypedAttribute>
          )}
        </div>
      </div>

      <div className={styles.attributeAside}>
        <button
          type="button"
          className={cx(
            styles.attributeButton,
            styles.attributeControl,
            styles.attributeControlRemove,
          )}
          onClick={handleClickCloseAttribute}
        >
          <IconTimes />
        </button>
      </div>

      <div className={styles.attributeOverlay} />
    </div>
  );
};

Attribute.propTypes = propTypes;
Attribute.defaultProps = defaultProps;

export default Attribute;
