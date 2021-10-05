import NS from './ns';

export const getEntityType = (state) => state[NS]?.entityType || '';
export const getEntities = (state) => state[NS]?.entities || [];
export const getEntitiesIsFetching = (state) => (
  Boolean(state[NS]?.entitiesIsFetching)
);
export const getEntitiesError = (state) => state[NS]?.entitiesError || null;
