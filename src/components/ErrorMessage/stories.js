import React from 'react';
import ErrorMessage from './index';

const title = 'Ошибка';
const message = 'Красочное описание ошибки';

const error = { response: { data: { error: { title, message } } } };

export default {
  title: 'Components/ErrorMessage',
  component: ErrorMessage,
};

export const Playground = (args) => (
  <ErrorMessage {...args} />
);
Playground.args = {
  error,
};
