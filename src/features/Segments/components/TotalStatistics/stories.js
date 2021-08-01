import React from 'react';
import TotalStatistics from './index';

export default {
  title: 'Features/Segments/components/TotalStatistics',
  component: TotalStatistics,
};

export const Playground = (args) => (
  <div style={{ maxWidth: '15rem' }}>
    <TotalStatistics {...args} />
  </div>
);
Playground.args = {
  isFetching: false,
  data: [
    { entityType: 'PHONE', total: 805612 },
    { entityType: 'EMAIL', total: 10365 },
  ],
  error: null,
};
