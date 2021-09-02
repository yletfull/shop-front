import React from 'react';
import { MemoryRouter } from 'react-router';
import NavTabs from './index';

export default {
  title: 'Components/NavTabs',
  component: NavTabs,
};

const Template = (args) => (
  <MemoryRouter>
    <NavTabs {...args} />
  </MemoryRouter>
);

export const Playground = Template.bind({});
Playground.args = {
  options: [
    {
      path: '/tasks/',
      title: 'Задачи',
    },
    {
      path: '/campaigns/',
      title: 'Информационные компании',
    },
  ],
  className: '',
};
