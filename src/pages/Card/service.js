import { $host } from '@/api';

export const fetchUserCard = async () => {
  const { data } = await $host.get('api/card');
  return data;
};

export const addCardItems = async (items) => {
  const { data } = await $host.post('api/card', {
    items,
  });
  return data;
};

export const removeCardItems = async (items) => {
  const { data } = await $host.delete('api/card', {
    data: {
      items,
    },
  });
  return data;
};

export default {
  fetchUserCard,
  addCardItems,
  removeCardItems,
};
