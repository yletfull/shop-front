import React from 'react';
import { observer } from 'mobx-react-lite';
import DeviceStore from '@/store/Devices';
import { Grid } from '@mui/material';
import DeviceItem from '../DeviceItem';
import styles from './styles.module.scss';

const DeviceList = observer(() => {
  const device = DeviceStore;

  return (
    <Grid container className={styles.devicesContainer}>
      {device.devices.map((d) =>
        <Grid item>
          <DeviceItem
            key={d.id}
            device={d}
          />
        </Grid>
      )}
    </Grid>

  );
});

export default DeviceList;
