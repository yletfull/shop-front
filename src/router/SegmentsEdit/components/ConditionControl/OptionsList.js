import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  debounceDelay: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};
const defaultProps = {
  debounceDelay: 1000,
};

const OptionsList = function SegmentConditionControlOptionsList({
  options,
  values,
  debounceDelay,
  onChange,
}) {
  const [localChecked, setLocalChecked] = useState(values || []);
  const handleChange = (e) => {
    const { checked, value } = e.target;

    const nextValue = checked
      ? [...localChecked, value]
      : localChecked.filter((d) => d !== value);

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
    <div onChange={handleChange}>
      {options.map((option) => (
        <div key={option}>
          <label>
            <input
              type="checkbox"
              value={option}
              checked={localChecked.includes(option)}
            />
            <span>
              {option}
            </span>
          </label>
        </div>
      ))}
    </div>
  );
};

OptionsList.propTypes = propTypes;
OptionsList.defaultProps = defaultProps;

export default OptionsList;
