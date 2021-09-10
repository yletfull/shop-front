export const apiBaseUrl = 'api/core/v1/rbac';

export const sections = {
  campaign: 'campaign',
  document: 'document',
  platform: 'platform',
  rbac: 'rbac',
  segment: 'segment',
  stats: 'stats',
  task: 'task',
  user: 'user',
};
export const mapSections = {
  [sections.campaign]: 'Рекламные кампании',
  [sections.document]: 'Документы',
  [sections.platform]: 'Платформы/Соцсети',
  [sections.rbac]: 'RBAC',
  [sections.segment]: 'Сегменты',
  [sections.stats]: 'Статистика',
  [sections.task]: 'Задачи',
  [sections.user]: 'Пользователи',
};

export default {
  apiBaseUrl,
  mapSections,
  sections,
};
