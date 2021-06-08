import React from 'react';
import PropTypes from 'prop-types';
import Input from '@/components/Input';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  data: PropTypes.shape({
    maxValue: PropTypes.string,
    minValue: PropTypes.string,
  }),
};

const defaultProps = {
  children: null,
  data: {},
};

const AttributeNumber = function AttributeNumber({
  children,
  data,
}) {
  const { maxValue, minValue } = data || {};
  return (
    <div className={styles.attributeNumber}>
      <div className={styles.attributeNumberSection}>
        <Input
          value={minValue}
        />
        &nbsp;
        -
        &nbsp;
        <Input
          value={maxValue}
        />
      </div>
      <div className={styles.attributeNumberSection}>
        {children}
      </div>
    </div>
  );
};

AttributeNumber.propTypes = propTypes;
AttributeNumber.defaultProps = defaultProps;

export default AttributeNumber;
