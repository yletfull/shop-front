import React, { useRef } from 'react';
import useFocusCapture from './index';

export default {
  title: 'Hooks/use-focus-capture',
  argTypes: {
    preventFocusCapture: { control: 'boolean' },
  },
};

export const Index = ({ preventFocusCapture }) => {
  const ref = useRef();
  useFocusCapture({ preventFocusCapture, ref });

  return (
    <div>
      <button type="button">
        outside
      </button>

      <div
        ref={ref}
        style={{
          outline: 'thin dashed darkred',
          padding: '2rem',
        }}
      >
        <a
          href="#anchor"
          tabIndex="-1"
        >
          unfocusable
        </a>
        <button type="button">
          first inside
        </button>
        <input
          type="text"
          placeholder="some input"
        />
        <button
          type="button"
          tabIndex="-1"
        >
          unfocusable
        </button>
        <button type="button">
          second inside
        </button>
        <a href="#anchor">
          some link
        </a>
        <button type="button">
          last inside
        </button>
        <input
          type="text"
          placeholder="unfocusable"
          tabIndex="-1"
        />
      </div>

      <a href="#ancor">
        outside
      </a>
    </div>
  );
};
Index.storyName = 'use-focus-capture';
Index.args = {
  preventFocusCapture: false,
};
