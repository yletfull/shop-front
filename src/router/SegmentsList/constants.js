/* eslint-disable import/prefer-default-export */
export const namespace = 'segments';

export const segmentDownloadPlatforms = {
  vk: 'VK',
  fb: 'FACEBOOK',
};

export const segmentEntityTypes = {
  emails: 'EMAIL',
  phones: 'PHONE',
};
export const mapSegmentEntityTypes = {
  [segmentEntityTypes.emails]: 'E-mail',
  [segmentEntityTypes.phones]: 'Телеф.',
};
