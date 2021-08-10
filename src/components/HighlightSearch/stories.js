import React from 'react';
import HighlightSearch from './index';

export default {
  title: 'Components/HighlightSearch',
  component: HighlightSearch,
};

const Template = (args) => (
  <HighlightSearch {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
  input: 'Поиск по подстроке',
  search: 'по',
  caseSensitive: false,
};
