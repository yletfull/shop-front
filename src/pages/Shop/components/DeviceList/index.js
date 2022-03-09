/* eslint-disable react/jsx-indent */
import React from 'react';
import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import DeviceItem from '../DeviceItem';
import styles from './styles.module.scss';

const propTypes = {
  devices: PropTypes.arrayOf(PropTypes.any),
};

const defaultProps = {
  devices: [],
};

const DeviceList = ({
  devices,
}) => (
  <Grid container className={styles.devicesContainer}>
    {devices.length
      ? devices.map((d) => (
        <Grid item>
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
