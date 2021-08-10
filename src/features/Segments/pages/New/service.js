import api from '@/api';
import { apiBaseUrl } from '@/features/Segments/constants';
import { mapConditionsForRequest } from '@/features/Segments/utils';

const saveSegment = function serviceSaveSegment(data) {
  const body = {
    title: data.title,
    description: data.description || '',
    conditions: mapConditionsForRequest(data.conditions),
  };

  return api
    .post(`${apiBaseUrl}/segments/`, body)
    .then((response) => response.data.data);
};

export default {
  saveSegment,
};
