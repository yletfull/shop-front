export const namespace = 'audiencesDetails';

export const entityTypes = {
  phones: 'PHONE',
  emails: 'EMAIL',
};

export const mapEntityTypes = {
  [entityTypes.phones]: 'Телефоны',
  [entityTypes.emails]: 'E-mail',
};

export const queryParams = {
  search: 'search',
};

export const mapQueryParams = {
  [queryParams.search]: 'searchText',
};
