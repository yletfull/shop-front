import React from 'react';
import PropTypes from 'prop-types';
import AttributeEnum from './AttributeEnum';
import styles from './styles.module.scss';

const propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
};

const defaultProps = {
  type: '',
  title: '',
};

const Attribute = function Attribute({
  type,
  title,
}) {
  const types = {
    enum: 'ENUM',
  };

  const attributes = {
    [types.enum]: AttributeEnum,
  };

  const TypedAttribute = attributes[type] || null;

  return (
    <div className={styles.attribute}>
      <TypedAttribute
        title={title}
      />
    </div>
  );
};

Attribute.propTypes = propTypes;
Attribute.defaultProps = defaultProps;

export default Attribute;
