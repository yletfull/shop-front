import {
  mapEntityTypes,
} from '@/features/Segments/constants';

export const formatStatisticEntities = (entities) => {
  const reduceStatisticsEntities = (acc, cur) => {
    const { entityType, total } = cur || {};
    if (!entityType) {
      return acc;
    }
    return ({ ...acc, [mapEntityTypes[entityType]]: total || 0 });
  };
  if (!Array.isArray(entities)) {
    return entities;
  }
  return entities.reduce(reduceStatisticsEntities, {});
};

export const formatSegmentAttributeForRequest = (attribute) => {
  const {
    datasetIds,
    equality: type,
    id: attributeId,
    negation,
    values,
  } = attribute || {};
  return ({
    attribute,
    attributeId,
    datasetIds,
    negation,
    type,
    values,
  });
};
export const formatSegmentAttributesListForRequest = (attributes) => {
  const mapAndSegmentAttributes = (andAttributes) => andAttributes
    .map(formatSegmentAttributeForRequest);
  return attributes.map(mapAndSegmentAttributes);
};

export const getRandomString = () => (
  String(Date.now())
  + Math.random().toString(32)
);
