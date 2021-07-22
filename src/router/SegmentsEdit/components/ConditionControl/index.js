import React from 'react';
import PropTypes from 'prop-types';
import {
  equalities,
  attributeTypes,
} from '../../constants';
import { serializeValues } from '../../utils';
import OptionsList from './OptionsList';
import EqualitySelect from './EqualitySelect';
import Input from './Input';

const propTypes = {
  type: PropTypes.oneOf(Object.values(attributeTypes)).isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  equality: PropTypes.oneOf(Object.values(equalities)).isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  onEqualityChange: PropTypes.func,
  onValuesChange: PropTypes.func,
};
const defaultProps = {
  options: [],
  onEqualityChange: () => {},
  onValuesChange: () => {},
};

const ConditionControl = function SegmentConditionControl({
  type,
  options,
  equality,
  values,
  onEqualityChange,
  onValuesChange,
}) {
  const hasOptions = Array.isArray(options)
    && options.length > 0;

  const handleEqualityChange = (nextEquality) => {
    onEqualityChange(nextEquality);
  };

  const handleValuesChange = (nextValues) => {
    if (serializeValues(values) !== serializeValues(nextValues)) {
      onValuesChange(nextValues);
    }
  };

  return (
    <div>
      {hasOptions
        ? (
          <OptionsList
            options={options}
            values={values}
            onChange={handleValuesChange}
          />
        )
        : (
          <div>
            <EqualitySelect
              value={equality}
              onChange={handleEqualityChange}
            />
            <Input
              type={type}
              values={values}
              onChange={handleValuesChange}
            />
          </div>
        )}
    </div>
  );
};

ConditionControl.propTypes = propTypes;
ConditionControl.defaultProps = defaultProps;

export default ConditionControl;
