export const padding = {
  bottom: 32,
  left: 32,
  right: 32,
  top: 0,
};

export const lines = {
  impressions: 'impressions',
  clicks: 'clicks',
  ctr: 'ctr',
};

export const linesLabels = {
  [lines.impressions]: 'Показы',
  [lines.clicks]: 'Клики',
  [lines.ctr]: 'CTR',
};

export const linesFactors = {
  [lines.impressions]: 1,
  [lines.clicks]: 1e2,
  [lines.ctr]: 1e8,
};

export const linesColors = {
  [lines.impressions]: '#999da3',
  [lines.clicks]: '#5f84c6',
  [lines.ctr]: '#f27c30',
};
