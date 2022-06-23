import { $authHost, $host } from '@/api';
import QueryString from 'qs';

export const createType = async (type) => {
  const { data } = await $authHost.post('api/type', type);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get('api/type');
  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $authHost.post('api/brand', brand);
  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get('api/brand',);
  return data;
};

export const fetchRatings = async () => {
  const { data } = await $host.get('api/device/ratings');
  return data;
};

export const createDevice = async (device) => {
  const { data } = await $authHost.post('api/device', device);
  return data;
};

export const fetchDevices = async (params) => {
  const { data } = await $host.get('api/device', { params,
    paramsSerializer: (d) => QueryString.stringify(d) });
  return data;
};

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get(`api/device/${id}`);
  return data;
};
