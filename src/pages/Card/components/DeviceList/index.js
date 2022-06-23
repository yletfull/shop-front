/* eslint-disable react/jsx-indent */
import React from 'react';
import { Alert, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import DeviceItem from '../DeviceItem';

const propTypes = {
  devices: PropTypes.arrayOf(PropTypes.any),
};

const defaultProps = {
  devices: [],
};

const DeviceList = ({
  devices,
}) => (
  <Grid
    container
    spacing={{ xs: 1, md: 1 }}
    columns={{ xs: 4, sm: 8, md: 12 }}
  >
    {devices.length
      ? devices.map((d) => (
        <Grid item xs={4} sm={4} md={4}>
          <DeviceItem
            key={d.id}
            device={d}
          />
        </Grid>
      )
      ) : (
        <Grid item xs={4} sm={8} md={12}>
          <Alert severity="info">Нет товаров</Alert>
        </Grid>
      )}
  </Grid>

);

DeviceList.propTypes = propTypes;
DeviceList.defaultProps = defaultProps;

export default DeviceList;
