import React from 'react';
import { MemoryRouter } from 'react-router';
import ListTable from './index';

export default {
  title: 'Features/Statistics/components/ListTable',
  component: ListTable,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

const Template = (args) => <ListTable {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  getDetailsLink: (id) => `#/${id}`,
  data: [
    {
      id: '45',
      index: 1,
      indexDiff: 5,
      name: 'Парки Москвы',
      impressions: { count: 999151, diff: 1.56 },
      clicks: { count: 8166, diff: 0.16 },
      ctr: { count: 0.99, diff: -0.5 },
      positiveReactions: { count: 4156, diff: 1.56 },
      negativeReactions: { count: 658, diff: 1.56 },
      repostsReactions: { count: 65, diff: 1.56 },
      totalReactions: { count: 5678, diff: 1.56 },
    },
  ],
  sort: {
    sortField: 'impressions',
    sortDir: 'desc',
  },
};
