import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  attributeTypes,
} from '@/features/Segments/constants';
import styles from './styles.module.scss';

const propTypes = {
  readOnly: PropTypes.bool,
  type: PropTypes.oneOf(Object.values(attributeTypes)).isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  debounceDelay: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};
const defaultProps = {
  readOnly: false,
  debounceDelay: 1000,
};

const getInputType = (attributeType) => {
  if (attributeType === attributeTypes.date) {
    return 'date';
  }

  if (attributeType === attributeTypes.number) {
    return 'number';
  }

  return 'text';
};

const Input = function SegmentConditionControlInput({
  readOnly,
  type,
  values,
  debounceDelay,
  onChange,
}) {
  const [localValue, setLocalValue] = useState(values[0] || '');
  useEffect(() => {
    setLocalValue(values[0] || '');
  }, [values]);
  const handleChange = (e) => {
    if (readOnly) {
      return;
    }

    setLocalValue(String(e.target.value));
  };
  const handleBlur = () => {
    onChange([localValue]);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange([localValue]);
    }, debounceDelay);

    return () => {
      clearTimeout(timeout);
    };
  }, [localValue, debounceDelay, onChange]);

  const style = {
    width: type === attributeTypes.number
      ? `${localValue.length + 5}ch`
      : '',
  };

  return (
    <input
      className={styles.input}
      style={style}
      type={getInputType(type)}
      value={localValue}
      readOnly={readOnly}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
