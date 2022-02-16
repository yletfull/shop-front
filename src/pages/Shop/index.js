import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import DeviceStore from '@/store/Devices';
import { Container, Paper } from '@mui/material';
import Spinner from '@/components/Spinner';
import DeviceList from './components/DeviceList';
import Pagination from './components/Pagination';
import Filters from './components/Filters';
import { fetchBrands, fetchDevices, fetchTypes, fetchRatings } from './service';

const Shop = observer(() => {
  const device = DeviceStore;
  const [isFetching, setIsFetching] = useState(false);

  useEffect(async () => {
    setIsFetching(true);
    await fetchTypes().then((data) => device.setTypes(data));
    await fetchBrands().then((data) => device.setBrands(data));
    await fetchRatings().then((data) => device.setRatings(data));
    await fetchDevices({
      page: device.page,
      limit: device.limit,
    }).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
    setIsFetching(false);
  }, []);

  useEffect(async () => {
    setIsFetching(true);
    await fetchDevices({
      type: device.selectedType,
      brands: device.selectedBrands,
      rating: device.selectedRating,
      page: device.page,
      limit: device.limit,
    })
      .then((data) => {
        device.setDevices(data.rows);
        device.setTotalCount(data.count);
      });
    setIsFetching(false);
  }, [
    device.page,
    device.selectedTypes,
    device.selectedBrands,
    device.selectedRating,
    device.limit,
  ]);

  return (
    <Container>
      <Paper variant="outlined">
        <Filters />
      </Paper>

      <Paper
        variant="outlined"
        sx={{ mt: 2 }}
      >
        <Spinner
          isFetching={isFetching}
          overlay
        />

        <DeviceList />
        <Pagination />
      </Paper>
    </Container>
  );
});

export default Shop;
