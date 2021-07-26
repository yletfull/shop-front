import React from 'react';
import ErrorMessage from './index';

const title = 'Ошибка';
const message = 'Красочное описание ошибки';

const error = { response: { data: { error: { title, message } } } };

export default {
  title: 'Components/ErrorMessage',
  component: ErrorMessage,
  argTypes: {
    children: { control: { type: 'text' } },
  },
};

export const Playground = (args) => (
  <ErrorMessage {...args} />
);
Playground.args = {
  error,
};
