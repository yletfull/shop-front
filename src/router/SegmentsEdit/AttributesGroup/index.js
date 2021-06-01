import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
};

const AttributesGroup = function AttributesGroup({ children }) {
  return (
    <div className={styles.attributesGroup}>
      {children}
    </div>
  );
};

AttributesGroup.propTypes = propTypes;
AttributesGroup.defaultProps = defaultProps;

export default AttributesGroup;
