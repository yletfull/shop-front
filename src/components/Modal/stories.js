import React from 'react';
import Modal from './index';

export default {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    isShown: {
      control: 'boolean',
    },
    notСlosable: {
      control: 'boolean',
    },
  },
};

const Template = (args) => {
  const { isShown, ...props } = args;
  return isShown ? <Modal {...props} /> : <div />;
};

export const Playground = Template.bind({});
Playground.args = {
  title: 'Modal title',
  children: 'Modal content',
  isShown: true,
};
