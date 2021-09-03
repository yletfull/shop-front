import React from 'react';
import { MemoryRouter } from 'react-router';
import NavTabs, { NavTabLink } from './index';

export default {
  title: 'Components/NavTabs',
  component: NavTabs,
};

const linksDataExample = [
  {
    key: 0,
    path: '/test1/',
    title: 'test1',
    exact: true,
  },
  {
    key: 1,
    path: '/test2/',
    title: 'test2',
    exact: true,
  },
];

const Template = (args) => (
  <MemoryRouter>
    <NavTabs {...args}>
      {linksDataExample?.map((props) => (
        <NavTabLink
          key={props.key}
          {...props}
        />
      ))}
    </NavTabs>
  </MemoryRouter>
);

export const Playground = Template.bind({});
Playground.args = {
  children: null,
  className: '',
};
