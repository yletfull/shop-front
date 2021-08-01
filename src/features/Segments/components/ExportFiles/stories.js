import React from 'react';
import ExportFiles from './index';

export default {
  title: 'Features/SegmentsEdit/components/ExportFiles',
  component: ExportFiles,
};

export const Playground = (args) => <ExportFiles {...args} />;
Playground.args = {
  segmentId: 1,
  conditions: [],
  defaultFileName: 'Работают или живут в ЦАО',
  hideIcons: false,
  statistics: [
    { entityType: 'PHONE', total: 805612 },
    { entityType: 'EMAIL', total: 10365 },
  ],
};
