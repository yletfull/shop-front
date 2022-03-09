import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '@/pages/Shop/service';
import View from './View';

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] });
  const [images, setImages] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetchOneDevice(id).then(data => setDevice(data));
  }, []);

  useEffect(() => {
    if (device.preview) {
      setImages((prev) => [...new Set([...prev, device.preview])]);
    }
    if (device.images) {
      setImages((prev) => [...new Set([...prev, ...device.images])]);
    }
  }, [device.preview, device.images]);

  return (
    <View
      images={images}
      device={device}
    />
  );
};

export default DevicePage;
