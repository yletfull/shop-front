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
};

const wrappedDefaultProps = {
  field: {},
};

const withFormikField = function withFormikField(Component) {
  const WrappedwithFormikField = function WrappedwithFormikField({
    field,
    ...props
  }) {
    return (
      <Component
        {...field}
        {...props}
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
