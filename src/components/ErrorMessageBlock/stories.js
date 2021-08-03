import React from 'react';
import ErrorMessageBlock from './index';

const title = 'Ошибка';
const message = 'Красочное описание ошибки';

const error = { response: { data: { error: { title, message } } } };

export default {
  title: 'Components/ErrorMessageBlock',
  component: ErrorMessageBlock,
};

export const Playground = (args) => (
  <ErrorMessageBlock {...args} />
);
Playground.args = {
  error,
};
