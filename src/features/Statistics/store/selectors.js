import NS from './ns';

export const getEntityType = () => null;
export const getEntities = (state) => state[NS]?.entities || [];
export const getEntitiesIsFetching = (state) => (
  Boolean(state[NS]?.entitiesIsFetching)
);
export const getEntitiesError = (state) => state[NS]?.entitiesError || null;
