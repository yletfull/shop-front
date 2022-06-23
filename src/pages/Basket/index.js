/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
// import BasketStore from '@/store/Basket';
import { fetchDevices } from './service';
import View from './View';

const BasketPage = observer(() => {
  // const Basket = BasketStore;

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(async () => {
    setIsFetching(true);
    try {
      // await fetchTypes().then((data) => device.setTypes(data));
      // await fetchBrands().then((data) => device.setBrands(data));
      // await fetchRatings().then((data) => device.setRatings(data));
      // const data = await fetchDevices({
      //   page: device.page,
      //   limit: device.limit,
      // });
      // device.setDevices(data.rows);
      // device.setTotalCount(data.count);
      setError(null);
    } catch (err) {
      setError(err);
    }
    setIsFetching(false);
  }, []);

  // useEffect(async () => {
  //   setIsFetching(true);
  //   try {
  //     const data = await fetchDevices({
  //       type: device.selectedType,
  //       brands: device.selectedBrands,
  //       rating: device.selectedRating,
  //       price: device.selectedPrice,
  //       page: device.page,
  //       limit: device.limit,
  //     });
  //     device.setDevices(data.rows);
  //     device.setTotalCount(data.count);
  //     setError(null);
  //   } catch (err) {
  //     setError(err);
  //   }
  //   setIsFetching(false);
  // }, [
  //   device.page,
  //   device.selectedTypes,
  //   device.selectedBrands,
  //   device.selectedRating,
  //   device.selectedPrice,
  //   device.limit,
  // ]);

  return (
    <View />
  );
});

export default BasketPage;
