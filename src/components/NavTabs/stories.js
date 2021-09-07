import React from 'react';
import { MemoryRouter } from 'react-router';
import NavTabs from './index';

export default {
  title: 'Components/NavTabs',
  component: NavTabs,
};

const Links = (props) => (
  <MemoryRouter>
    <NavTabs>
      <NavTabs.Link
        to="/"
        exact
        {...props}
      >
        Главная
      </NavTabs.Link>
      <NavTabs.Link to="/tasks">
        Задачи
      </NavTabs.Link>
      <NavTabs.Link to="/campaigns">
        ИК
      </NavTabs.Link>
      <NavTabs.Link to="/sites">
        Сайты
      </NavTabs.Link>
    </NavTabs>
  </MemoryRouter>
);

export const LinksString = Links.bind({});
LinksString.args = {
  to: '/login',
};

export const LinksObject = Links.bind({});
LinksObject.args = {
  to: {
    pathname: '/login',
    search: '?utm=your+face',
    state: { referrer: 'currentLocation' },
  },
};

export const Buttons = () => (
  <NavTabs>
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
