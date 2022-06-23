import React from 'react';
import ErrorMessageBlock from '@/components/ErrorMessageBlock';
import Spinner from '@/components/Spinner';
import PropTypes from 'prop-types';
import { Container, Paper } from '@mui/material';
import DeviceList from './components/DeviceList';

const propTypes = {
  devices: PropTypes.arrayOf(PropTypes.any),
  error: PropTypes.objectOf(PropTypes.any),
  isFetching: PropTypes.bool,
};

const defaultProps = {
  devices: [],
  error: null,
  isFetching: false,
};

const View = ({
  devices,
  error,
  isFetching,
}) => (
  <Container>
    {error && (
      <ErrorMessageBlock error={error} />
    )}

    {!error && (
      <Paper
        variant="outlined"
        sx={{ mt: 2 }}
      >
        <Spinner
          isFetching={isFetching}
          overlay
        />
        {!isFetching && (
          <DeviceList
            devices={devices}
          />
        )}
      </Paper>
    )}
  </Container>
);

View.propTypes = propTypes;
View.defaultProps = defaultProps;

export default View;
