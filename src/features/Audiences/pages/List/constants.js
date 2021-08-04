export const namespace = 'audiencesList';

export const entityTypes = {
  emails: 'EMAIL',
  phones: 'PHONE',
};

export const queryParams = {
  searchName: 'title',
  searchLocal: 'isLocal',
  page: 'page',
};

export const mapQueryParams = {
  [queryParams.searchName]: 'title',
  [queryParams.searchLocal]: 'isLocal',
  [queryParams.page]: 'currentPage',
};
