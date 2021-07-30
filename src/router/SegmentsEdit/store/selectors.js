import NS from './ns';

export const getAreAttributesFetching = (state) => (
  Boolean(state[NS]?.attributes?.isFetching)
);
export const getAttributesTree = (state) => (
  state[NS]?.attributes?.tree || []
);
export const getConditions = (state) => state[NS]?.conditions || [];

export const getStatistics = (state) => state[NS]?.statistics?.data || [];
export const getIsStatisticsFetching = (state) => (
  Boolean(state[NS]?.statistics?.isFetching)
);
export const getStatisticsError = (state) => (
  state[NS]?.statistics?.error || null
);
