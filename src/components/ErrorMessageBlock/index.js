import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@mui/material';

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

  const handleClose = () => setIsShown(false);

  useEffect(() => {
    setIsShown(true);
  }, [error]);

  return (
    (error && isShown) && (
      <Alert
        severity="error"
        onClose={handleClose}
        sx={{ mb: 1 }}
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
