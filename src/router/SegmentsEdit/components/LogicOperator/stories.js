import React from 'react';
import LogicOperator from './index';

export default {
  title: 'Features/SegmentsEdit/components/LogicOperator',
  component: LogicOperator,
};

export const Playground = (args) => <LogicOperator {...args} />;
Playground.args = {
  type: 'and',
};
