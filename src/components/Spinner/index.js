import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import styles from './styles.module.scss';

const propTypes = {
  overlay: PropTypes.bool,
  isFetching: PropTypes.bool,
};

const defaultProps = {
  overlay: false,
  isFetching: false,
};

const ErrorMessageBlock = function ErrorMessageBlock({
  overlay,
  isFetching,
  ...props
}) {
  return (
    isFetching && (
      <div
        data-overlay={overlay}
        className={styles.spinnerWrapper}
      >
        <CircularProgress {...props} />
      </div>

    )
  );
};

ErrorMessageBlock.propTypes = propTypes;
ErrorMessageBlock.defaultProps = defaultProps;

export default ErrorMessageBlock;
