import { $authHost } from '@/api';

export const createFeedback = async (feedback) => {
  const { data } = await $authHost.post('api/device/feedback', feedback);
  return data;
};

export default {
  createFeedback,
};
