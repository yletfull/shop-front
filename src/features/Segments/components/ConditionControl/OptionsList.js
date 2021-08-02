import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InputCheckbox from '@/components/InputCheckbox';
import styles from './styles.module.scss';

const propTypes = {
  readOnly: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  debounceDelay: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};
const defaultProps = {
  readOnly: false,
  debounceDelay: 700,
};

const OptionsList = function SegmentConditionControlOptionsList({
  readOnly,
  options,
  values,
  debounceDelay,
  onChange,
}) {
  const [localChecked, setLocalChecked] = useState(values || []);
  const handleChange = (e, nextValue) => {
    if (readOnly) {
      return;
    }

    setLocalChecked(nextValue.sort());
  };
  useEffect(() => {
    setLocalChecked(values);
  }, [values]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(localChecked);
    }, debounceDelay);

    return () => {
      clearTimeout(timeout);
    };
  }, [localChecked, debounceDelay, onChange]);

  const optionsList = readOnly ? values : options;

  return (
    <div
      className={styles.options}
    >
      {optionsList.map((option) => (
        <div
          key={option}
          className={styles.optionsItem}
        >
          <InputCheckbox
            value={option}
            checked={localChecked}
            readOnly={readOnly}
            onChange={handleChange}
          >
            {option}
          </InputCheckbox>
        </div>
      ))}
    </div>
  );
};

OptionsList.propTypes = propTypes;
OptionsList.defaultProps = defaultProps;

export default OptionsList;