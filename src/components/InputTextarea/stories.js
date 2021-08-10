import React from 'react';
import InputTextarea from './index';

export default {
  title: 'components/InputTextarea',
  component: InputTextarea,
};

export const Playground = (args) => <InputTextarea {...args} />;
Playground.args = {
  rows: 4,
  fullwidth: true,
};
