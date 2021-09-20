import NS from './ns';

export const getEntities = (state) => state[NS]?.entities?.data || [];
export const getIsEntitiesFetching = (state) => (
  Boolean(state[NS]?.entities?.isFetching)
);
export const getEntitiesError = (state) => (
  state[NS]?.entities?.error || null
);
