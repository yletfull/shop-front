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
  title: 'Modal title adfasd afdsf asdf asdf asdf asdf asdf asdf asdf asdaf asdf asdf asdf asdf asdf asdf asdf asdaf sdaf asdf asdf asdf asdf asdf asd f',
  children: 'Modal content',
};
