import React from 'react';
import WithSpinner from './index';

export default {
  title: 'Components/WithSpinner',
  component: WithSpinner,
  argTypes: {
    children: { control: { type: 'text' } },
  },
};

const Template = (args) => (
  <WithSpinner
    {...args}
  />
);

export const Playground = Template.bind({});
Playground.args = {
  isFetching: true,
  children: 'Загрузка завершена',
};
