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
  serializeValues,
  mapStatisticsEntities,
};
