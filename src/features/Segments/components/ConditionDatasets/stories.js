import React from 'react';
import ConditionDatasets from './index';

export default {
  title: 'Features/Segments/components/ConditionDatasets',
  component: ConditionDatasets,
};

export const Playground = (args) => <ConditionDatasets {...args} />;
Playground.args = {
  attributeName: 'education_level',
  value: [],
  options: [
    {
      id: 1,
      name: 'initial',
      loadedAt: '2020-04-03T00:17:37',
      entityTypeTotals: [
        { entityType: 'PHONE', total: 4165737 },
      ],
    },
    {
      id: 4,
      name: 'voshod_gosti_baza',
      loadedAt: '2021-07-26T16:52:33',
      entityTypeTotals: [
        { entityType: 'PHONE', total: 574682 },
        { entityType: 'EMAIL', total: 0 },
      ],
    },
    {
      id: 7,
      name: 'profiles_20210511_fix',
      entityTypeTotals: [
        { entityType: 'EMAIL', total: 98402 },
      ],
    },
  ],
};
