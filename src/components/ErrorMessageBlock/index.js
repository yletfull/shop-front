import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@mui/material';

const propTypes = {
  error: PropTypes.objectOf(PropTypes.any),
  isClosable: PropTypes.bool,
};

const defaultProps = {
  error: null,
  isClosable: true,
};

const ErrorMessageBlock = function ErrorMessageBlock({
  error,
  isClosable,
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
        onClose={isClosable ? handleClose : null}
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
