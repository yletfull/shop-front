import { useEffect, useCallback } from 'react';
import api from '@/api';
import useService from '@/hooks/use-service';
import {
  apiBaseUrl,
  equalities,
} from '@/features/Segments/constants';
import {
  mapStatisticsEntities,
  mapConditionsForRequest,
} from '@/features/Segments/utils';

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
      conditions: mapConditionsForRequest([[condition]]),
      title: condition?.attribute?.attributeName || 'tmp',
    };

    return api
      .post(`${apiBaseUrl}/segments/stats/`, body, options)
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
