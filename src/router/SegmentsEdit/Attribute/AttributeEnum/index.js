import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  title: PropTypes.string,
};

const defaultProps = {
  children: null,
  name: '',
  title: '',
};

const AttributeEnum = function AttributeEnum({
  children,
  name,
  title,
}) {
  return (
    <div className={styles.attributeEnum}>
      <div className={styles.attributeEnumSection}>
        <span className={styles.attributeEnumTitle}>
          {name || title}
        </span>
      </div>
      <div className={styles.attributeEnumSection}>
        {children}
      </div>
    </div>
  );
};

AttributeEnum.propTypes = propTypes;
AttributeEnum.defaultProps = defaultProps;

export default AttributeEnum;
