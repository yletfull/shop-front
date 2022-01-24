import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';

const propTypes = {
  isFetching: PropTypes.bool,
};

const defaultProps = {
  isFetching: false,
};

const ErrorMessageBlock = function ErrorMessageBlock({
  isFetching,
  ...props
}) {
  return (
    isFetching && (
      <Spinner
        animation="border"
        role="status"
        className=""
        {...props}
      />
    )
  );
};

ErrorMessageBlock.propTypes = propTypes;
ErrorMessageBlock.defaultProps = defaultProps;

export default ErrorMessageBlock;
