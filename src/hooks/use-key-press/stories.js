import React from 'react';
import useKeyPress from './index';

export default {
  title: 'Hooks/use-key-press',
  argTypes: {
    key: {
      control: { type: 'text' },
    },
    event: {
      options: ['keydown', 'keyup'],
      control: { type: 'radio' },
    },
    onKeypress: { action: 'Key pressed on window' },
  },
};

export const Index = ({ key, event, onKeypress, ...args }) => {
  useKeyPress(key, onKeypress, event);

  return (
    <div {...args}>
      Press the selected key
    </div>
  );
};
Index.args = {
  key: 'Enter',
  event: 'keydown',
};
Index.parameters = {
  controls: { hideNoControlsWarning: true },
};
