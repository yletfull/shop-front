export const namespace = 'segmentsEdit';

export const statisticsFields = ['phone', 'email'];

export const dndTypes = {
  attribute: 'attribute',
  condition: 'condition',
};

export const attributeProps = {
  max: 'max',
  min: 'min',
  name: 'attributeName',
  title: 'title',
  values: 'values',
  datasets: 'datasets',
  datasetIds: 'datasetIds',
  negation: 'negation',
  equality: 'equality',
};

export const attributeTypes = {
  date: 'DATE',
  enum: 'ENUM',
  number: 'NUMERIC',
  segment: 'SEGMENT',
  string: 'STRING',
};

export const equalityTypes = {
  any: 'ANY',
  equal: 'EQUAL',
  greaterOrEqual: 'GREATER_OR_EQUAL',
  less: 'LESS',
  lesserOfEqual: 'LESSER_OR_EQUAL',
};

export const equalities = {
  in: 'ANY',
  eq: 'EQUAL',
  gte: 'GREATER_OR_EQUAL',
  lt: 'LESS',
  lte: 'LESSER_OR_EQUAL',
};

export const entityTypes = {
  phones: 'PHONE',
  emails: 'EMAIL',
};

export const mapEntityTypes = {
  [entityTypes.phones]: 'phones',
  [entityTypes.emails]: 'emails',
};

export const segmentProps = {
  attributes: 'conditions',
  id: 'id',
  name: 'title',
};

export const initialStatisticEntities = {
  isFetching: false,
  emails: null,
  error: null,
  phones: null,
};
