import React from 'react';
import { storiesOf } from '@storybook/react';
import useOnClickOutside from './index';

storiesOf('Hooks/useOnClickOutside', module)
  .add('index', () => {
    const values = useOnClickOutside();

    return (
      <pre>
        {JSON.stringify(values, null, 2)}
      </pre>
    );
  });
