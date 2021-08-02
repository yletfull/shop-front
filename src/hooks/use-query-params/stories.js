import React from 'react';
import useQueryParams from './index';

export default {
  title: 'Hooks/use-query-params',
  argTypes: {
  },
};

export const Index = ({ ...args }) => {
  const values = useQueryParams();

  return (
    <pre {...args}>
      {JSON.stringify(values, null, 2)}
    </pre>
  );
};
Index.storyName = 'use-query-params';
Index.args = {
};
Index.parameters = {
  controls: {
    expanded: false,
    hideNoControlsWarning: true,
  },
};
