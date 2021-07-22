import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@/components/Checkbox';
import styles from './styles.module.scss';

const propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  debounceDelay: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};
const defaultProps = {
  debounceDelay: 700,
};

const OptionsList = function SegmentConditionControlOptionsList({
  options,
  values,
  debounceDelay,
  onChange,
}) {
  const [localChecked, setLocalChecked] = useState(values || []);
  const handleChange = (e, nextValue) => {
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

  return (
    <div
      className={styles.options}
    >
      {options.map((option) => (
        <div
          key={option}
          className={styles.optionsItem}
        >
          <Checkbox
            value={option}
            checked={localChecked}
            onChange={handleChange}
          >
            {option}
          </Checkbox>
        </div>
      ))}
    </div>
  );
};

OptionsList.propTypes = propTypes;
OptionsList.defaultProps = defaultProps;

export default OptionsList;
