import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  field: PropTypes.shape({
    onChange: PropTypes.func,
  }),
  onChange: PropTypes.func,
};

const defaultProps = {
  field: {},
  onChange: () => {},
};

const AttributeEnumCheckbox = function AttributeEnumCheckbox({
  field,
  onChange,
  ...props
}) {
  const handleChangeInput = (e) => {
    if (typeof field?.onChange === 'function') {
      field.onChange(e);
    }
    onChange();
  };
  return (
    <input
      {...field}
      {...props}
      onChange={handleChangeInput}
    />
  );
};

AttributeEnumCheckbox.propTypes = propTypes;
AttributeEnumCheckbox.defaultProps = defaultProps;

export default AttributeEnumCheckbox;
