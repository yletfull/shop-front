---
to: src/components/<%= h.changeCase.pascal(name) %>/stories.js
---
import React from 'react';
import <%= h.changeCase.pascal(name) %> from './index';

export default {
  title: 'Components/<%= h.changeCase.pascal(name) %>',
  component: <%= h.changeCase.pascal(name) %>,
  argTypes: {<% if (locals.container) { %>
    children: { control: { type: 'text' } },<% } %>
  },
};

const Template = (args) => (
  <<%= h.changeCase.pascal(name) %> {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
};
