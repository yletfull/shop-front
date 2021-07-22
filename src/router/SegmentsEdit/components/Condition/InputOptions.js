import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};
const defaultProps = {
};

const InputOptions = function ConditionInputOptions({
  values,
  options,
  onChange,
}) {
  const handleChange = (e) => {
    const { checked, value } = e.target;

    const nextValue = checked
      ? [...values, value]
      : values.filter((d) => d !== value);

    onChange(nextValue.sort());
  };

  return (
    <div
      className={styles.inputOptions}
      onChange={handleChange}
    >
      {options.map((option) => (
        <label
          key={option}
          className={styles.inputOptionsItem}
        >
          <input
            className={styles.inputOptionsItemCheckbox}
            type="checkbox"
            value={option}
            checked={values.includes(option)}
          />

          <span className={styles.inputOptionsItemLabel}>
            {option}
          </span>
        </label>
      ))}
    </div>
  );
};

InputOptions.propTypes = propTypes;
InputOptions.defaultProps = defaultProps;

export default InputOptions;
