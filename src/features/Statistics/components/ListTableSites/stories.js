import React from 'react';
import { MemoryRouter } from 'react-router';
import ListTableSites from './index';

export default {
  title: 'Features/Statistics/components/ListTableSites',
  component: ListTableSites,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

const Template = (args) => <ListTableSites {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  getDetailsLink: (id) => `#/${id}`,
  data: [
    {
      id: '45',
      parentId: null,
      index: 1,
      indexDiff: 1,
      name: 'mos.ru',
      impressions: { count: 999151, diff: 1.56 },
      clicks: { count: 8166, diff: 0.16 },
      ctr: { count: 0.99, diff: -0.5 },
    },
    {
      id: '8',
      parentId: '45',
      name: 'ed.mos.ru',
      impressions: { count: 999151, diff: 1.56 },
      clicks: { count: 8166, diff: 0.16 },
      ctr: { count: 0.99, diff: -0.5 },
    },
  ],
  sort: {
    sortField: 'impressions',
    sortDir: 'desc',
  },
};
