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

export default {
  getRandomString,
  checkHasOptions,
  serializeValues,
  mapStatisticsEntities,
};
