import React from 'react';
import Button from './index';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    children: { control: { type: 'text' } },
  },
};

export const Playground = (args) => (
  <Button {...args} />
);
Playground.args = {
  children: 'Click me',
};
