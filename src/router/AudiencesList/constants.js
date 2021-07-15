export const namespace = 'audiencesList';

export const entityTypes = {
  emails: 'EMAIL',
  phones: 'PHONE',
};

export const queryParams = {
  searchName: 'name',
  searchLocal: 'local',
  page: 'page',
};

export const mapQueryParams = {
  [queryParams.searchName]: 'title',
  [queryParams.searchLocal]: 'local',
  [queryParams.page]: 'page',
};
