import React from 'react';
import PageHeader from './index';

export default {
  title: 'Components/PageHeader',
  component: PageHeader,
};

const Template = (args) => (
  <PageHeader {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
};
