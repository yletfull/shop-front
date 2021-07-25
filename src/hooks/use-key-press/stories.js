import React from 'react';
import useKeyPress from './index';

export default {
  title: 'Hooks/use-key-press',
  argTypes: {
    key: {
      control: { type: 'text' },
      description: 'String or Array (input multiple values using ",")',
    },
    event: {
      options: ['keydown', 'keyup'],
      control: { type: 'radio' },
      description: 'Type of event',
    },
    handler: { action: 'Key pressed on window' },
  },
};

export const Index = ({ key, event, handler, ...args }) => {
  useKeyPress({
    event,
    handler,
    key: key.replace(/\s+/, '').split(','),
  });

  return (
    <div {...args}>
      Press the
      <code>
        {` ${key} `}
      </code>
      key
    </div>
  );
};
Index.storyName = 'use-key-press';
Index.args = {
  key: 'Enter',
  event: 'keydown',
};
Index.parameters = {
  controls: {
    expanded: false,
    hideNoControlsWarning: true,
  },
};
