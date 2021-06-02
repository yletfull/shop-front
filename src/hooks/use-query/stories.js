import React, { useEffect } from 'react';
import { MemoryRouter, useHistory } from 'react-router';
import useQuery from './index';

export default {
  title: 'Hooks/use-query',
  argTypes: {
    currentUrl: { control: { type: 'text' } },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Index = ({ currentUrl, ...args }) => {
  const history = useHistory();
  useEffect(() => {
    history.push(currentUrl);
  }, [history, currentUrl]);

  const query = useQuery();

  const queryObject = {};
  query.forEach((value, key) => {
    queryObject[key] = value;
  });

  return (
    <pre {...args}>
      {JSON.stringify(queryObject, null, 2)}
    </pre>
  );
};
Index.args = {
  currentUrl: '/some/path/?foo=bar&test=42',
};
Index.parameters = {
  controls: { hideNoControlsWarning: true },
};
