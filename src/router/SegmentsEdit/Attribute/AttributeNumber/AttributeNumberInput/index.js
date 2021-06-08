import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Input from '@/components/Input';
import styles from './styles.module.scss';

const propTypes = {
  className: PropTypes.string,
  field: PropTypes.shape({
    onBlur: PropTypes.func,
  }),
  onBlur: PropTypes.func,
};

const defaultProps = {
  className: '',
  field: {},
  onBlur: () => {},
};

const AttributeNumberInput = function AttributeNumberInput({
  className,
  field,
  onBlur,
  ...props
}) {
  const handleInputBlur = (e) => {
    if (typeof field?.onBlur === 'function') {
      field.onBlur(e);
    }
    onBlur();
  };
  return (
    <span className={cx(styles.attributeNumberInput, className)}>
      <Input
        {...field}
        {...props}
        type="number"
        onBlur={handleInputBlur}
        fullwidth
      />
    </span>
  );
};

AttributeNumberInput.propTypes = propTypes;
AttributeNumberInput.defaultProps = defaultProps;

export default AttributeNumberInput;
