import React, { useRef } from 'react';
import useOnClickOutside from './index';

export default {
  title: 'Hooks/use-on-click-outside',
  argTypes: {
    onClickOutside: { action: 'Outside click' },
    onClick: { action: 'Button click' },
  },
};

export const Index = ({ onClick, onClickOutside, ...args }) => {
  const elRef = useRef(null);
  useOnClickOutside(elRef, onClickOutside);

  return (
    <div {...args}>
      <div
        ref={elRef}
        style={{
          backgroundColor: 'lightgray',
          border: 'thin solid black',
          margin: '5em',
          padding: '2em',
          textAlign: 'center',
        }}
      >
        <button
          type="button"
          onClick={onClick}
        >
          Some button
        </button>
        <br />
        Click outside me
      </div>
    </div>
  );
};
Index.storyName = 'use-on-click-outside';
Index.parameters = {
  controls: {
    expanded: false,
    hideNoControlsWarning: true,
  },
};
