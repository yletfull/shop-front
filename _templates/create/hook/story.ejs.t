---
to: src/hooks/<%= h.changeCase.param(name) %>/story.js
---
import React from 'react';
import { storiesOf } from '@storybook/react';
import <%= h.changeCase.camel(name) %> from './index';

storiesOf('Hooks/<%= h.changeCase.camel(name) %>', module)
  .add('index', () => {
    const values = <%= h.changeCase.camel(name) %>();

    return (
      <pre>
        {JSON.stringify(values, null, 2)}
      </pre>
    );
  });
