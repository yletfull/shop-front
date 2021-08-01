import api from '@/api';
import { apiBaseUrl } from './constants';
import { mapConditionsForRequest } from './utils';

const fetchAttributes = function segmentsServiceFetchAttributes() {
  return api
    .get(`${apiBaseUrl}/attributes/`)
    .then((response) => response?.data?.data?.groups || []);
};
const fetchSegment = function serviceFetchSegment(id) {
  if (typeof id === 'undefined') {
    return Promise.reject(new Error('`id` not found'));
  }
  return api
    .get(`${apiBaseUrl}/segments/${id}/`)
    .then((response) => response.data.data);
};

const fetchSegmentStatistics = function serviceFetchSegmentStatistics(
  data,
  options = {},
) {
  return api
    .post(`${apiBaseUrl}/segments/stats/`, data, options)
    .then((response) => response.data.data);
};

const fetchStatistics = function segmentServiceFetchStatistics(
  { conditions, title },
  options = {},
) {
  return api
    .post(
      `${apiBaseUrl}/segments/stats/`,
      {
        title: title || 'new-segment',
        conditions: mapConditionsForRequest(conditions),
      },
      options,
    )
    .then((response) => response.data.data);
};

export default {
  fetchAttributes,
  fetchStatistics,
  fetchSegment,
  fetchSegmentStatistics,
};
