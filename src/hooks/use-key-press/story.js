import React from 'react';
import { storiesOf } from '@storybook/react';
import useKeyPress from './index';

storiesOf('Hooks/useKeyPress', module)
  .add('index', () => {
    const values = useKeyPress();

    return (
      <pre>
        {JSON.stringify(values, null, 2)}
      </pre>
    );
  });
