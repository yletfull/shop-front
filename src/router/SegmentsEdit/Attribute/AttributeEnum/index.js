import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
};

const AttributeEnum = function AttributeEnum({
  children,
}) {
  return (
    <div className={styles.attributeEnum}>
      <div className={styles.attributeEnumSection}>
        {children}
      </div>
    </div>
  );
};

AttributeEnum.propTypes = propTypes;
AttributeEnum.defaultProps = defaultProps;

export default AttributeEnum;
