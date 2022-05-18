/* eslint-disable react/jsx-indent */
import React from 'react';
import { Grid, Typography } from '@mui/material';
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
        <Typography sx={{ m: 1.5 }}>
          Нет товаров
        </Typography>
      )}
  </Grid>

);

DeviceList.propTypes = propTypes;
DeviceList.defaultProps = defaultProps;

export default DeviceList;
