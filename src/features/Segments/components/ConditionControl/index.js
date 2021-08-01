import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  equalities,
  attributeTypes,
} from '@/features/Segments/constants';
import { serializeValues } from '../../utils';
import NegationToggle from './NegationToggle';
import OptionsList from './OptionsList';
import EqualitySelect from './EqualitySelect';
import Input from './Input';
import styles from './styles.module.scss';

const propTypes = {
  readOnly: PropTypes.bool,
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
  readOnly: false,
  options: [],
  onNegationChange: () => {},
  onEqualityChange: () => {},
  onValuesChange: () => {},
};

const ConditionControl = function SegmentConditionControl({
  readOnly,
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
    if (!readOnly && nextNegation !== negation) {
      onNegationChange(nextNegation);
    }
  };

  const handleEqualityChange = (nextEquality) => {
    if (!readOnly && nextEquality !== equality) {
      onEqualityChange(nextEquality);
    }
  };

  const handleValuesChange = (nextValues) => {
    if (!readOnly && serializeValues(values) !== serializeValues(nextValues)) {
      onValuesChange(nextValues);
    }
  };

  return (
    <span className={styles.wrapper}>
      <NegationToggle
        readOnly={readOnly}
        value={negation}
        onChange={handleNegationChange}
      />

      {hasOptions
        ? (
          <OptionsList
            readOnly={readOnly}
            options={options}
            values={values}
            onChange={handleValuesChange}
          />
        )
        : (
          <Fragment>
            <EqualitySelect
              readOnly={readOnly}
              className={styles.fieldEqualitySelect}
              value={equality}
              onChange={handleEqualityChange}
            />
            <Input
              readOnly={readOnly}
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
