import React from 'react';
import useElementSize from './index';

export default {
  title: 'Hooks/use-element-size',
  argTypes: {
  },
};

export const Index = ({ ...args }) => {
  const values = useElementSize();

  return (
    <pre {...args}>
      {JSON.stringify(values, null, 2)}
    </pre>
  );
};
Index.storyName = 'use-element-size';
Index.args = {
};
Index.parameters = {
  controls: {
    expanded: false,
    hideNoControlsWarning: true,
  },
};
