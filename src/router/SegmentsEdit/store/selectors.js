import NS from './ns';

export const getAreAttributesFetching = (state) => (
  Boolean(state[NS]?.attributes?.isFetching)
);
export const getAttributesTree = (state) => (
  state[NS]?.attributes?.tree || []
);
export const getConditions = (state) => state[NS]?.conditions || [];
