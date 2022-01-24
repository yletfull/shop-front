import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const propTypes = {
  error: PropTypes.objectOf(PropTypes.any),
};

const defaultProps = {
  error: null,
};

const ErrorMessageBlock = function ErrorMessageBlock({
  error,
  ...props
}) {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    setIsShown(true);
  }, [error]);

  return (
    (error && isShown) && (
      <Alert
        className="mt-3"
        variant="danger"
        onClose={() => setIsShown(false)}
        dismissible
        {...props}
      >
        {error.response?.data?.message || 'Произошла ошибка'}
      </Alert>
    )
  );
};

ErrorMessageBlock.propTypes = propTypes;
ErrorMessageBlock.defaultProps = defaultProps;

export default ErrorMessageBlock;
