import React from 'react';
import PropTypes from 'prop-types';
import IconTimes from '@/icons/TimesLight';
import AttributeEnum from './AttributeEnum';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  groupIndex: PropTypes.number.isRequired,
  name: PropTypes.string,
  index: PropTypes.number.isRequired,
  title: PropTypes.string,
  type: PropTypes.string,
  onRemove: PropTypes.func,
};

const defaultProps = {
  children: null,
  name: '',
  title: '',
  type: '',
  onRemove: () => {},
};

const Attribute = function Attribute({
  children,
  groupIndex,
  name,
  index,
  title,
  type,
  onRemove,
}) {
  const types = {
    enum: 'ENUM',
  };

  const attributes = {
    [types.enum]: AttributeEnum,
  };

  const TypedAttribute = attributes[type] || null;

  const handleClickCloseAttribute = (e) => {
    const { index: attributeIndex, group } = e?.target?.dataset || {};
    if (typeof attributeIndex === 'undefined'
      || typeof group === 'undefined') {
      return;
    }
    onRemove([group, attributeIndex]);
  };

  return (
    <div className={styles.attribute}>
      <div className={styles.attributeMain}>
        <TypedAttribute
          className={styles.attribute}
          name={name}
          title={title}
        >
          {children}
        </TypedAttribute>
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
