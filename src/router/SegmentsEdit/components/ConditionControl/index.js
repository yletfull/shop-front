import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  equalities,
  attributeTypes,
} from '../../constants';
import { serializeValues } from '../../utils';
import NegationToggle from './NegationToggle';
import OptionsList from './OptionsList';
import EqualitySelect from './EqualitySelect';
import Input from './Input';
import styles from './styles.module.scss';

const propTypes = {
  negation: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(Object.values(attributeTypes)).isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  equality: PropTypes.oneOf(Object.values(equalities)).isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  onNegationChange: PropTypes.func,
  onEqualityChange: PropTypes.func,
  onValuesChange: PropTypes.func,
};
const defaultProps = {
  options: [],
  onNegationChange: () => {},
  onEqualityChange: () => {},
  onValuesChange: () => {},
};

const ConditionControl = function SegmentConditionControl({
  negation,
  type,
  options,
  equality,
  values,
  onNegationChange,
  onEqualityChange,
  onValuesChange,
}) {
  const hasOptions = Array.isArray(options)
    && options.length > 0;

  const handleNegationChange = (nextNegation) => {
    if (nextNegation !== negation) {
      onNegationChange(nextNegation);
    }
  };

  const handleEqualityChange = (nextEquality) => {
    if (nextEquality !== equality) {
      onEqualityChange(nextEquality);
    }
  };

  const handleValuesChange = (nextValues) => {
    if (serializeValues(values) !== serializeValues(nextValues)) {
      onValuesChange(nextValues);
    }
  };

  return (
    <span className={styles.wrapper}>
      <NegationToggle
        value={negation}
        onChange={handleNegationChange}
      />

      {hasOptions
        ? (
          <OptionsList
            options={options}
            values={values}
            onChange={handleValuesChange}
          />
        )
        : (
          <Fragment>
            <EqualitySelect
              className={styles.fieldEqualitySelect}
              value={equality}
              onChange={handleEqualityChange}
            />
            <Input
              type={type}
              values={values}
              onChange={handleValuesChange}
            />
          </Fragment>
        )}
    </span>
  );
};

ConditionControl.propTypes = propTypes;
ConditionControl.defaultProps = defaultProps;

export default ConditionControl;
