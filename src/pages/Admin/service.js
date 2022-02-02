import { $authHost } from '@/api';

export const getUsers = async () => await $authHost.get('api/user/users').then((data) => data.data);

export const setUser = async (body) => {
  const { id } = body;

  await $authHost.patch(`api/user/${id}`, body)
    .then((data) => data.data);
};

export const getRoles = async () => await $authHost.get('api/user/roles').then((data) => data.data);


export default {
  getUsers,
  setUser,
  getRoles,
};
