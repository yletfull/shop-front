import jwt_decode from 'jwt-decode';
import { $authHost, $host } from '@/api';

export const registration = async (body) => {
  const { data } = await $host.post('api/user/registration', body);
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token);
};

export const login = async (body) => {
  const { data } = await $host.post('api/user/login', body);
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get('api/user/auth');
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token);
};
