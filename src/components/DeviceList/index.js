import React from 'react';
import { observer } from 'mobx-react-lite';
import DeviceItem from '@/components/DeviceItem';
import DeviceStore from '@/store/Devices';
import { Grid } from '@mui/material';
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
