import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import DeviceStore from '@/store/Devices';
import { fetchBrands, fetchDevices, fetchTypes, fetchRatings } from './service';
import View from './View';

const Shop = observer(() => {
  const device = DeviceStore;

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const [selectedType, setSelectedType] = useState();
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRating, setSelectedRating] = useState();
  const [selectedPrice, setSelectedPrice] = useState({});

  const handleTypesChange = (e) => setSelectedType(e);
  const handleBrandsChange = (e) => setSelectedBrands(e);
  const handleRatingChange = (e) => setSelectedRating(e);
  const handlePriceChange = ({ event, option }) => {
    const { value } = event.currentTarget;
    setSelectedPrice((prev) => ({ ...prev, [option]: value }));
  };

  const handleFiltersAccept = () => {
    device.setSelectedType(selectedType);
    device.setSelectedBrands(selectedBrands);
    device.setSelectedRating(selectedRating);
    device.setSelectedPrice(selectedPrice);
  };

  useEffect(async () => {
    setIsFetching(true);
    try {
      await fetchTypes().then((data) => device.setTypes(data));
      await fetchBrands().then((data) => device.setBrands(data));
      await fetchRatings().then((data) => device.setRatings(data));
      const data = await fetchDevices({
        page: device.page,
        limit: device.limit,
      });
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
      setError(null);
    } catch (err) {
      setError(err);
    }
    setIsFetching(false);
  }, []);

  useEffect(async () => {
    setIsFetching(true);
    try {
      const data = await fetchDevices({
        type: device.selectedType,
        brands: device.selectedBrands,
        rating: device.selectedRating,
        price: device.selectedPrice,
        page: device.page,
        limit: device.limit,
      });
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
      setError(null);
    } catch (err) {
      setError(err);
    }
    setIsFetching(false);
  }, [
    device.page,
    device.selectedTypes,
    device.selectedBrands,
    device.selectedRating,
    device.selectedPrice,
    device.limit,
  ]);

  return (
    <View
      devices={device.devices}
      error={error}
      isFetching={isFetching}
      types={device.types}
      brands={device.brands}
      ratings={device.ratings}
      selectedType={selectedType}
      selectedPrice={selectedPrice}
      selectedRating={selectedRating}
      selectedBrands={selectedBrands}
      handleTypesChange={handleTypesChange}
      handleBrandsChange={handleBrandsChange}
      handleRatingChange={handleRatingChange}
      handleFiltersAccept={handleFiltersAccept}
      handlePriceChange={handlePriceChange}
    />
  );
});

export default Shop;
