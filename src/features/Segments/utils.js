// TODO: use UUID
export const getRandomString = () => (
  String(Date.now())
  + Math.random().toString(32)
);

export const checkHasOptions = (options) => (
  Array.isArray(options) && options.length > 0
);

export const serializeValues = (values) => (
  values
    .map(String)
    .sort()
    .join('')
);

export const mapStatisticsEntities = (data) => {
  const raw = (data || []).reduce((acc, d) => ({
    ...acc,
    [d.entityType]: d.total || 0,
  }), {});

  return {
    phone: raw.PHONE || 0,
    email: raw.EMAIL || 0,
  };
};

export const mapConditionsForRequest = (conditions) => conditions
  .map((group) => (
    group.map((condition) => ({
      attributeId: condition.attributeId || condition.id,
      datasetIds: condition.datasetIds,
      negation: condition.negation,
      type: condition.equality,
      values: condition.values,
    }))
  ));

export default {
  getRandomString,
  checkHasOptions,
  serializeValues,
  mapStatisticsEntities,
  mapConditionsForRequest,
};
