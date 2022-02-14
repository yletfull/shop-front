import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Pages from '@/pages/Pages';
import FiltersBar from '@/components/FiltersBar';
import DeviceList from '@/components/DeviceList';
import DeviceStore from '@/store/Devices';
import { Container, Paper } from '@mui/material';
import { fetchBrands, fetchDevices, fetchTypes } from './service';

const Shop = observer(() => {
  const device = DeviceStore;

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data));
    fetchBrands().then(data => device.setBrands(data));
    fetchDevices(null, null, 1, 2).then(data => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit)
      .then(data => {
        device.setDevices(data.rows);
        device.setTotalCount(data.count);
      });
  }, [device.page, device.selectedType, device.selectedBrand, device.limit]);

  return (
    <Container>
      <Paper>
        <FiltersBar />
      </Paper>

      <Paper sx={{ mt: 2 }}>
        <DeviceList />
        <Pages />
      </Paper>
    </Container>
  );
});

export default Shop;
