export const platforms = [
  {
    id: 'FACEBOOK',
    name: 'Facebook',
    shortName: 'FB',
    entityTypes: ['EMAIL', 'PHONE'],
  },
  {
    id: 'MAIL_RU',
    name: 'Mail.ru',
    shortName: 'Mail',
    entityTypes: ['EMAIL', 'PHONE'],
  },
  {
    id: 'VK',
    name: 'ВКонтакте',
    shortName: 'VK',
    entityTypes: ['EMAIL', 'PHONE'],
  },
  {
    id: 'YANDEX',
    name: 'Yandex',
    shortName: 'Ya',
    entityTypes: ['EMAIL', 'PHONE'],
  },
];

export const mapPlatform = platforms
  .reduce((acc, platform) => ({
    ...acc,
    [platform.id]: platform,
  }), {});

export default {
  platforms,
  mapPlatform,
};
