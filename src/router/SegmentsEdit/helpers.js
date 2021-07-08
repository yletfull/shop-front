import {
  mapEntityTypes,
} from './constants';

export const formatStatisticEtities = (entities) => {
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

export const formatSegmentAttributesForRequest = (attributes) => {
  const mapOrSegmentAttributes = (attr) => {
    const {
      datasetIds,
      equality: type,
      id: attributeId,
      negation,
      values,
    } = attr || {};
    return ({
      attribute: attr,
      attributeId,
      datasetIds,
      negation,
      type,
      values,
    });
  };
  const mapAndSegmentAttributes = (andAttributes) => andAttributes
    .map(mapOrSegmentAttributes);
  return attributes.map(mapAndSegmentAttributes);
};

export const temp = 0;
