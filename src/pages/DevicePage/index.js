/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '@/pages/Shop/service';
import View from './View';
import { createFeedback } from './service';

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] });
  const [images, setImages] = useState([]);

  const { id } = useParams();

  const handleDeviceFetch = () => {
    fetchOneDevice(id).then(data => setDevice(data));
  };

  useEffect(() => {
    handleDeviceFetch();
  }, []);

  useEffect(() => {
    if (device.preview) {
      setImages((prev) => [...new Set([...prev, device.preview])]);
    }
    if (device.images) {
      setImages((prev) => [...new Set([...prev, ...device.images])]);
    }
  }, [device.preview, device.images]);

  const handleAddFeedbackModalSubmit = async (data) => {
    const feedback = await createFeedback({
      deviceId: id,
      ...data,
    });
    await handleDeviceFetch();
    return feedback;
  };

  return (
    <View
      images={images}
      device={device}
      onAddFeedbackModalSubmit={handleAddFeedbackModalSubmit}
    />
  );
};

export default DevicePage;
