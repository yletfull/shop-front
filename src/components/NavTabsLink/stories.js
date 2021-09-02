import React from 'react';
import { MemoryRouter } from 'react-router';
import NavTabsLink from './index';

export default {
  title: 'Components/NavTabsLink',
  component: NavTabsLink,
};

const Template = (args) => (
  <MemoryRouter>
    <NavTabsLink {...args} />
  </MemoryRouter>
);

export const Playground = Template.bind({});
Playground.args = {
  path: '/tasks/',
  title: 'Задачи',
  exact: true,
};
