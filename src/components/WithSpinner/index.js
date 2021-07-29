import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '@/components/Spinner';

const propTypes = {
  isFetching: PropTypes.bool,
  children: PropTypes.node,
};

const defaultProps = {
  isFetching: false,
  children: '',
};

const WithSpinner = function WithSpinner({
  isFetching,
  children,
  ...props
}) {
  if (isFetching) {
    return (
      <Spinner
        {...props}
      />
    );
  }

  return children;
};

WithSpinner.propTypes = propTypes;
WithSpinner.defaultProps = defaultProps;

export default WithSpinner;
