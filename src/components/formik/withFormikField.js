import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  Component: PropTypes.element,
};

const defaultProps = {
  Component: null,
};

const wrappedPropTypes = {
  field: PropTypes.shape({
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
  }),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
};

const wrappedDefaultProps = {
  field: {},
  onBlur: () => {},
  onChange: () => {},
};

const withFormikField = function withFormikField(Component) {
  const WrappedwithFormikField = function WrappedwithFormikField({
    field,
    onBlur,
    onChange,
    ...props
  }) {
    const handleFieldBlur = (e) => {
      if (typeof field?.onBlur === 'function') {
        field.onBlur(e);
      }
      onBlur(e);
    };
    const handleFieldChange = (e) => {
      if (typeof field?.onChange === 'function') {
        field.onChange(e);
      }
      onChange(e);
    };

    return (
      <Component
        {...field}
        {...props}
        onBlur={handleFieldBlur}
        onChange={handleFieldChange}
      />
    );
  };

  WrappedwithFormikField.propTypes = wrappedPropTypes;
  WrappedwithFormikField.defaultProps = wrappedDefaultProps;

  return WrappedwithFormikField;
};

withFormikField.propTypes = propTypes;
withFormikField.defaultProps = defaultProps;

export default withFormikField;
