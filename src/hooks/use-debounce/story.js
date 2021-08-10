import React from 'react';
import { storiesOf } from '@storybook/react';
import useDebounce from './index';

storiesOf('Hooks/useDebounce', module)
  .add('index', () => {
    const values = useDebounce();

    return (
      <pre>
        {JSON.stringify(values, null, 2)}
      </pre>
    );
  });
