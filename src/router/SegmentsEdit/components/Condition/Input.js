import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from '@/components/Select';
import styles from './styles.module.scss';

const propTypes = {
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  // TODO: should be enum
  equality: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
const defaultProps = {
};

const equalityOptions = [
  { value: 'EQUAL', text: '=' },
  { value: 'GREATER_OR_EQUAL', text: '>=' },
  // { value: 'LESS', text: '<' },
  { value: 'LESSER_OR_EQUAL', text: '<=' },
];

const Input = function ConditionInput({
  values,
  equality,
  onChange,
}) {
  const [value, setValue] = useState('');
  const handleValueChange = (e) => setValue(e.target.value);
  const handleValueBlur = () => {
    if (value !== values[0]) {
      onChange({
        values: [value],
        equality,
      });
    }
  };

  useEffect(() => {
    if (Array.isArray(values) && values.length > 0) {
      setValue(values[0]);
    }
  }, [values]);

  const handleEqualityChange = (e) => {
    onChange({
      values,
      equality: e.target.value,
    });
  };

  return (
    <div className={styles.input}>
      <Select
        className={styles.inputEqualitySelect}
        resetText=""
        value={equality}
        options={equalityOptions}
        onChange={handleEqualityChange}
      />

      <input
        className={styles.inputValueInput}
        type="text"
        value={value}
        onChange={handleValueChange}
        onBlur={handleValueBlur}
      />
    </div>
  );
};

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
