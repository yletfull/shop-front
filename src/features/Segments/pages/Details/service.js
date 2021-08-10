import api from '@/api';
import { apiBaseUrl } from '@/features/Segments/constants';
import { getRandomString } from '@/features/Segments/utils';

const getSegment = function serviceGetSegment(id) {
  return api
    .get(`${apiBaseUrl}/segments/${id}`)
    .then((response) => response.data.data)
    .then((segment) => ({
      ...segment,
      conditions: segment.conditions.map((group) => (
        group.map((condition) => ({
          ...condition,
          equality: condition.type,
          id: condition.attributeId,
          clientId: getRandomString(),
        }))
      )),
    }));
};

export default {
  getSegment,
};
