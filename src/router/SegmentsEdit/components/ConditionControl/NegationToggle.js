import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import IconExclamation from '@/icons/Exclamation';
import styles from './styles.module.scss';

const propTypes = {
  debounceDelay: PropTypes.number,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
const defaultProps = {
  debounceDelay: 500,
};

const NegationToggle = function SegmentConditionControlNegationToggle({
  debounceDelay,
  value,
  onChange,
}) {
  const [localValue, setLocalValue] = useState(Boolean(value));
  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  const handleChange = (e) => {
    setLocalValue(Boolean(e.target.checked));
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(localValue);
    }, debounceDelay);

    return () => {
      clearTimeout(timeout);
    };
  }, [localValue, debounceDelay, onChange]);

  const title = localValue
    ? 'Отрицание: ВКЛ.'
    : 'Отрицание: ВЫКЛ.';

  return (
    <label
      className={styles.negationToggle}
      title={title}
    >
      <input
        className={styles.negationToggleInput}
        type="checkbox"
        checked={localValue}
        onChange={handleChange}
      />
      <span className={styles.negationToggleLabel}>
        <IconExclamation />
      </span>
    </label>
  );
};

NegationToggle.propTypes = propTypes;
NegationToggle.defaultProps = defaultProps;

export default NegationToggle;
