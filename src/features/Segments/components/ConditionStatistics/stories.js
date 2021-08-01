import React from 'react';
import ConditionStatistics from './index';

export default {
  title: 'Features/Segments/components/ConditionStatistics',
  component: ConditionStatistics,
};

export const Playground = (args) => <ConditionStatistics {...args} />;
Playground.args = {
  isFetching: false,
  data: {
    phone: 35178,
    email: 0,
  },
  fields: ['phone'],
};
