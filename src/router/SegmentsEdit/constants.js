export const namespace = 'segmentsEdit';

export const dndTypes = {
  attribute: 'attribute',
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
