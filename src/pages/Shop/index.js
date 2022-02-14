import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Pages from '@/pages/Pages';
import FiltersBar from '@/components/FiltersBar';
import DeviceList from '@/components/DeviceList';
import DeviceStore from '@/store/Devices';
import { Container, Paper } from '@mui/material';
import Spinner from '@/components/Spinner';
import { fetchBrands, fetchDevices, fetchTypes } from './service';

const Shop = observer(() => {
  const device = DeviceStore;
  const [isFetching, setIsFetching] = useState(false);

  useEffect(async () => {
    setIsFetching(true);
    await fetchTypes().then(data => device.setTypes(data));
    await fetchBrands().then(data => device.setBrands(data));
    await fetchDevices(null, null, device.page, device.limit).then(data => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
    setIsFetching(false);
  }, []);

  useEffect(async () => {
    setIsFetching(true);
    await fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit)
      .then(data => {
        device.setDevices(data.rows);
        device.setTotalCount(data.count);
      });
    setIsFetching(false);
  }, [device.page, device.selectedType, device.selectedBrand, device.limit]);

  return (
    <Container>
      <Paper>
        <FiltersBar />
      </Paper>

      <Paper sx={{ mt: 2 }}>
        <Spinner
          isFetching={isFetching}
          overlay
        />

        <DeviceList />
        <Pages />
      </Paper>
    </Container>
  );
});

export default Shop;
