import React from 'react';
import PropTypes from 'prop-types';
import Select from '@/components/Select';
import {
  equalities,
} from '../../constants';

const propTypes = {
  value: PropTypes.oneOf([
    equalities.eq,
    equalities.gte,
    equalities.lte,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
};
const defaultProps = {
};

const options = [
  { value: equalities.eq, text: '=' },
  { value: equalities.gte, text: '>=' },
  { value: equalities.lte, text: '<=' },
];

const EqualitySelect = function SegmentConditionControlEqualitySelect({
  value,
  onChange,
}) {
  const handleChange = (e) => {
    if (e.target.value) {
      onChange(e.target.value);
    } else {
      onChange(equalities.eq);
    }
  };

  return (
    <Select
      resetText=""
      value={value}
      options={options}
      onChange={handleChange}
    />
  );
};

EqualitySelect.propTypes = propTypes;
EqualitySelect.defaultProps = defaultProps;

export default EqualitySelect;
