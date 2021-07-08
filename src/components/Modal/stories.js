import React from 'react';
import Modal from './index';

export default {
  title: 'Components/Modal',
  component: Modal,
};

const Template = (args) => (
  <Modal {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
  title: 'Modal title',
  children: 'Modal content',
};
