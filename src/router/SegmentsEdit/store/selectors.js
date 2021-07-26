import { createSelector } from '@reduxjs/toolkit';
import NS from './ns';

export const getAreAttributesFetching = (state) => (
  Boolean(state[NS]?.attributes?.isFetching)
);
export const getAttributesTree = (state) => (
  state[NS]?.attributes?.tree || []
);
export const getConditions = (state) => state[NS]?.conditions || [];

export const getMapProfileTitle = createSelector(
  [getAttributesTree],
  (attributesTree) => attributesTree.reduce((acc, group) => {
    try {
      const [{ profileId }] = group.attributes;

      return {
        ...acc,
        [profileId]: group.group,
      };
    } catch (error) {
      console.error(error);
      return acc;
    }
  }, {}),
);
export const getMapAttribute = createSelector(
  [getAttributesTree],
  (attributesTree) => attributesTree.reduce((result, group) => ({
    ...result,
    ...group.attributes.reduce((acc, attribute) => ({
      ...acc,
      [attribute.id]: attribute,
    }), {}),
  }), {}),
);
