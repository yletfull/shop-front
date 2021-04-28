import axios from 'axios';

// const baseURL = process.env.BASE_URL || '/';
const baseURL = 'http://advert.sandbox.ubic.tech';

const api = axios.create({ baseURL });

export const resolve = (...pathSegments) => (
  [baseURL, ...pathSegments]
    .filter(Boolean)
    .join('/')
    .replace(/\/+/gm, '/')
);

export const securityPrefix = 'security';
export const security = axios.create({
  baseURL: [baseURL, securityPrefix].join('/').replace(/\/+/gm, '/'),
});

export default api;
