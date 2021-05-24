---
to: src/components/<%= h.changeCase.pascal(name) %>/story.js
---
import React from 'react';
import { storiesOf } from '@storybook/react';
<% if (!('props' in locals) || locals.props) { -%>
import { withKnobs<%= locals.container ? ', text' : '' %> } from '@storybook/addon-knobs';
<% } -%>
import <%= h.changeCase.pascal(name) %> from './index';

storiesOf('components/<%= h.changeCase.pascal(name) %>', module)
<% if (!('props' in locals) || locals.props) { -%>
  .addDecorator(withKnobs)
<% } -%>
<% if (locals.container) { -%>
  .add('index', () => (
    <<%= h.changeCase.pascal(name) %>>
      {text('content', 'content')}
    </<%= h.changeCase.pascal(name) %>>
  ));
<% } -%>
<% if (!locals.container) { -%>
  .add('index', () => (
    <<%= h.changeCase.pascal(name) %> />
  ));
<% } -%>
