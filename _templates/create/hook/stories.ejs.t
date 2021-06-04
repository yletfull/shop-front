---
to: src/hooks/<%= h.changeCase.param(name) %>/stories.js
---
import React from 'react';
import <%= h.changeCase.camel(name) %> from './index';

export default {
  title: 'Hooks/<%= h.changeCase.param(name) %>',
  argTypes: {
  },
};

export const Index = ({ ...args }) => {
  const values = <%= h.changeCase.camel(name) %>();

  return (
    <pre {...args}>
      {JSON.stringify(values, null, 2)}
    </pre>
  );
};
Index.storyName = '<%= h.changeCase.param(name) %>';
Index.args = {
};
Index.parameters = {
  controls: {
    expanded: false,
    hideNoControlsWarning: true,
  },
};
