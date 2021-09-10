import React from 'react';
import { MemoryRouter } from 'react-router';
import NavTabs from './index';

export default {
  title: 'Components/NavTabs',
  component: NavTabs,
};

export const Links = (args) => (
  <MemoryRouter {...args}>
    <NavTabs>
      <NavTabs.Link
        to="/"
        exact
      >
        Главная
      </NavTabs.Link>
      <NavTabs.Link to="/tasks">
        Задачи
      </NavTabs.Link>
      <NavTabs.Link to={{ pathname: '/campaigns', hash: '#test' }}>
        ИК
      </NavTabs.Link>
      <NavTabs.Link to="/sites">
        Сайты
      </NavTabs.Link>
    </NavTabs>
  </MemoryRouter>
);

export const Buttons = (args) => (
  <NavTabs {...args}>
    <NavTabs.Button>
      Задачи
    </NavTabs.Button>
    <NavTabs.Button isActive>
      ИК
    </NavTabs.Button>
    <NavTabs.Button>
      Сайты
    </NavTabs.Button>
  </NavTabs>
);