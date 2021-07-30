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

export const rights = {
  [sections.task]: {
    creative_create: 'creative_create',
    creative_approve: 'creative_approve',
    control: 'control',
    create: 'create',
    select_agent: 'select_agent',
    view_all: 'view_all',
    view_assigned: 'view_assigned',
    view_own: 'view_own',
  },
  [sections.campaign]: {
    control: 'control',
    create: 'create',
    publish: 'publish',
    setup: 'setup',
    view_all: 'view_all',
    view_own: 'view_own',
    creative_create: 'creative_create',
    creative_copy: 'creative_copy',
  },
  [sections.segment]: {
    create: 'create',
    download_file: 'download_file',
    post_to_platform: 'post_to_platform',
    view_audiences: 'view_audiences',
  },
  [sections.stats]: {
    all_campaigns: 'all_campaigns',
    all_tasks: 'all_tasks',
    client_dashboard: 'client_dashboard',
    manager_dashboard: 'manager_dashboard',
    own_taks_campaigns: 'own_taks_campaigns',
    own_tasks: 'own_tasks',
    segments: 'segments',
    templates: 'templates',
    manage: 'manage',
  },
  [sections.user]: {
    manage: 'manage',
  },
  [sections.rbac]: {
    manage: 'manage',
  },
  [sections.platform]: {
    control: 'control',
    view: 'view',
  },
  [sections.document]: {
    upload: 'upload',
    get: 'get',
  },
};

export default {
  rights,
  sections,
};
