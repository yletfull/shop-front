import { useEffect, useCallback } from 'react';
import api from '@/api';
import useService from '@/hooks/use-service';
import { equalities } from '../../constants';
import { mapStatisticsEntities } from '../../utils';

const apiUrl = 'api/v1/external/ctor/api/v1/segments/stats/';

const useStatistics = function useStatisticsSegmentConditionHook({
  attribute = {},
  attributeId,
  datasetIds,
  equality,
  negation,
  values,
} = {}) {
  const service = useCallback((condition, options = {}) => {
    const body = {
      conditions: [
        [{
          attribute: condition.attribute || {},
          datasetIds: condition.datasetIds,
          type: condition.equality,
          negation: condition.negation,
          attributeId: condition.attributeId,
          values: condition.values,
        }],
      ],
      title: condition?.attribute?.attributeName || 'tmp',
    };

    return api
      .post(apiUrl, body, options)
      .then((response) => response.data.data)
      .then(mapStatisticsEntities);
  }, []);

  const statistics = useService({
    initialData: {},
    service,
  });
  const { fetch } = statistics;

  useEffect(() => {
    if (!values?.length && equality !== equalities.in) {
      return;
    }

    fetch({
      attribute,
      attributeId,
      datasetIds,
      equality,
      negation,
      values,
    });
  }, [attribute, attributeId, datasetIds, equality, negation, values, fetch]);

  return statistics;
};

export default useStatistics;
