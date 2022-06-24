/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState } from 'react';
import { Alert, Grid, Paper, Stack, Typography } from '@mui/material';
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
}) => {
  const [devicesList, setDevicesList] = useState([]);
  useEffect(() => {
    const currentDevicesList = devices.reduce((acc, device) => {
      const includeDeviceIndex = acc
        .findIndex((accDevice) => accDevice.device.id === device.device.id);
      if (includeDeviceIndex > -1) {
        acc[includeDeviceIndex].count += 1;
        return acc;
      }
      return [
        ...acc,
        {
          device: device.device,
          count: 1,
        },
      ];
    }, []);
    setDevicesList(currentDevicesList);
  }, []);
  return (
    <Grid
      container
      sx={{ p: 2 }}
      columns={{ xs: 12, sm: 12, md: 12 }}
    >
      <Grid item xs={12} sm={12} md={12}>
        <Paper sx={{ height: '2rem' }} elevation={0}>
          <Typography align="center" alignItems="center">
            Корзина
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={10} sm={10} md={10}>
        <Stack spacing={1}>
          {devicesList.length
            ? devicesList.map(({ device, count }) => (
              <DeviceItem
                key={device.id}
                device={device}
                count={count}
              />
            )
            ) : (
              <Alert severity="info">Нет товаров</Alert>
            )}
        </Stack>
      </Grid>
    </Grid>);
};

DeviceList.propTypes = propTypes;
DeviceList.defaultProps = defaultProps;

export default DeviceList;
