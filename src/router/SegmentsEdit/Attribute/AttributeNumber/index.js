import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
};

const AttributeNumber = function AttributeNumber({
  children,
}) {
  return (
    <div className={styles.wrapper}>
      AttributeNumber
      {children}
    </div>
  );
};

AttributeNumber.propTypes = propTypes;
AttributeNumber.defaultProps = defaultProps;

export default AttributeNumber;
