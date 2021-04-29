import api from '@/api';

const fetchAccountsList = () => api.get('api/v1/ad-cabinets').then((data) => data);

const setAccount = ({ cabinetId }) => api.patch(`api/v1/ad-cabinet/${cabinetId}`).then((data) => data);

const fetchClientsList = ({ cabinetId }) => api.get(`api/v1/ad-cabinet/${cabinetId}/clients`).then((data) => data);

export default {
  fetchAccountsList,
  setAccount,
  fetchClientsList,
};
