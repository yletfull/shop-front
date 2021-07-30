import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import IconEquals from '@/icons/Equals';
import IconLessThanEqual from '@/icons/LessThanEqual';
import IconGreaterThanEqual from '@/icons/GreaterThanEqual';
import {
  equalities,
} from '../../constants';
import styles from './styles.module.scss';

const propTypes = {
  readOnly: PropTypes.bool,
  debounceDelay: PropTypes.number,
  value: PropTypes.oneOf([
    equalities.eq,
    equalities.gte,
    equalities.lte,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
};
const defaultProps = {
  readOnly: false,
  debounceDelay: 700,
};

const options = [
  {
    value: equalities.lte,
    icon: <IconLessThanEqual />,
    title: 'Меньше или равно',
  },
  {
    value: equalities.eq,
    icon: <IconEquals />,
    title: 'Равно',
  },
  {
    value: equalities.gte,
    icon: <IconGreaterThanEqual />,
    title: 'Больше или равно',
  },
];

const EqualitySelect = function SegmentConditionControlEqualitySelect({
  readOnly,
  debounceDelay,
  value,
  onChange,
}) {
  const [localValue, setLocalValue] = useState(value);
  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  const handleChange = (e) => {
    if (readOnly) {
      return;
    }

    setLocalValue(e.target.value || equalities.eq);
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(localValue);
    }, debounceDelay);

    return () => {
      clearTimeout(timeout);
    };
  }, [localValue, debounceDelay, onChange]);

  return (
    <span className={styles.pills}>
      {options.map((option) => (
        <label
          key={option.value}
          className={styles.pillsOption}
          title={option.title}
          data-readonly={String(readOnly)}
        >
          <input
            className={styles.pillsOptionInput}
            type="radio"
            value={option.value}
            checked={localValue === option.value}
            readOnly={readOnly}
            onChange={handleChange}
          />
          <span className={styles.pillsOptionLabel}>
            {option.icon}
          </span>
        </label>
      ))}
    </span>
  );
};

EqualitySelect.propTypes = propTypes;
EqualitySelect.defaultProps = defaultProps;

export default EqualitySelect;
