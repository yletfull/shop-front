import React from 'react';
import WithSpinner from './index';

export default {
  title: 'Components/WithSpinner',
  component: WithSpinner,
};

const Template = (args) => {
  const { isFetching, ...props } = args;
  return (
    <WithSpinner
      {...props}
      isFetching={isFetching}
    >
      Загрузка завершена
    </WithSpinner>
  );
};
export const Playground = Template.bind({});
Playground.args = {
  isFetching: true,
};
