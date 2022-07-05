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
  onCardAddItem: PropTypes.func,
  onCardRemoveItem: PropTypes.func,
};

const defaultProps = {
  devices: [],
  error: null,
  isFetching: false,
  onCardAddItem: () => {},
  onCardRemoveItem: () => {},
};

const View = ({
  devices,
  error,
  isFetching,
  onCardAddItem,
  onCardRemoveItem,
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
            onCardAddItem={onCardAddItem}
            onCardRemoveItem={onCardRemoveItem}
          />
        )}
      </Paper>
    )}
  </Container>
);

View.propTypes = propTypes;
View.defaultProps = defaultProps;

export default View;
