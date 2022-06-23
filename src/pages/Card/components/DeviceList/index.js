/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState } from 'react';
import { Alert, Box, Grid, Typography } from '@mui/material';
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
  console.log(devicesList);
  return (
    <Grid
      container
      spacing={{ xs: 1, md: 1 }}
      columns={{ xs: 12, sm: 12, md: 12 }}
    >
      {devicesList.length
        ? devicesList.map(({ device, count }) => (
          <Grid item xs={10} sm={10} md={10}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <DeviceItem
                key={device.id}
                device={device}
              />
              <Typography
                color="text.secondary"
              >
                { count } шт.
              </Typography>
            </Box>
          </Grid>
        )
        ) : (
          <Grid item xs={12} sm={12} md={12}>
            <Alert severity="info">Нет товаров</Alert>
          </Grid>
        )}
    </Grid>);
};

DeviceList.propTypes = propTypes;
DeviceList.defaultProps = defaultProps;

export default DeviceList;
