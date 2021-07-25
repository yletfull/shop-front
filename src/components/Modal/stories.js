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
  return (
    <div style={{ height: '200vh' }}>
      {isShown && (
        <Modal {...props} />
      )}
    </div>
  );
};
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper suscipit pellentesque. Maecenas pellentesque tincidunt suscipit. Vestibulum iaculis sapien eu nibh convallis egestas. Phasellus elementum arcu sed dolor pretium, id dapibus ex luctus. Pellentesque mauris leo, ullamcorper ac metus nec, tempor mattis justo. Praesent vel ipsum orci. Donec et cursus nisi. Proin molestie vitae metus ac fringilla. Vestibulum non orci quis leo dapibus facilisis. Quisque consectetur dui in est elementum, sed ornare enim lobortis. Sed vestibulum purus ligula, quis hendrerit mi auctor eget.';

export const Playground = Template.bind({});
Playground.args = {
  title: 'Modal title',
  children: 'Modal content',
  isShown: true,
};

export const Tall = Template.bind({});
Tall.args = {
  title: 'Modal title',
  children: (
    <div>
      <div>
        {lorem}
      </div>
      <div style={{ marginTop: '4rem' }}>
        {lorem}
      </div>
      <div style={{ marginTop: '4rem' }}>
        {lorem}
      </div>
    </div>
  ),
  isShown: true,
};
