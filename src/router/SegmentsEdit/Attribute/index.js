import React from 'react';
import PropTypes from 'prop-types';
import AttributeEnum from './AttributeEnum';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
};

const defaultProps = {
  children: null,
  name: '',
  title: '',
  type: '',
};

const Attribute = function Attribute({
  children,
  name,
  title,
  type,
}) {
  const types = {
    enum: 'ENUM',
  };

  const attributes = {
    [types.enum]: AttributeEnum,
  };

  const TypedAttribute = attributes[type] || null;

  return (
    <TypedAttribute
      className={styles.attribute}
      name={name}
      title={title}
    >
      {children}
    </TypedAttribute>
  );
};

Attribute.propTypes = propTypes;
Attribute.defaultProps = defaultProps;

export default Attribute;
