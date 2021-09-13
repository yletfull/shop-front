export const namespace = 'segmentsEdit';

export const apiBaseUrl = 'api/ctor/v1';

export const dndTypes = {
  condition: 'condition',
};

export const attributeTypes = {
  date: 'DATE',
  enum: 'ENUM',
  number: 'NUMERIC',
  segment: 'SEGMENT',
  string: 'STRING',
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

export const segmentEntityTypes = {
  emails: 'EMAIL',
  phones: 'PHONE',
};
export const mapSegmentEntityTypes = {
  [segmentEntityTypes.emails]: 'E-mail',
  [segmentEntityTypes.phones]: 'Телеф.',
};

export const segmentDownloadPlatforms = {
  vk: 'VK',
  fb: 'FACEBOOK',
  mail: 'MAIL_RU',
  yandex: 'YANDEX',
};

export const queryParams = {
  searchId: 'id',
  searchName: 'title',
  searchNewEntities: 'isNewEntityAvailable',
  searchVersion: 'versionCountFrom',
  page: 'page',
};
