import api from '@/api';

const baseUrl = 'api/v1/external/ctor/api/v1';

const saveSegment = function serviceSaveSegment(data) {
  const body = {
    title: data.title,
    description: data.description || '',
    conditions: data.conditions.map((group) => (
      group.map((condition) => ({
        attributeId: condition.id,
        type: condition.equality,
        negation: condition.negation,
        values: condition.values,
        datasetIds: condition.datasetIds,
      }))
    )),
  };

  return api
    .post(`${baseUrl}/segments/`, body)
    .then((response) => response.data.data);
};

export default {
  saveSegment,
};
