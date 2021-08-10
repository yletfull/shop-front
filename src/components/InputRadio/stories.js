import React from 'react';
import InputRadio from './index';

export default {
  title: 'Components/InputRadio',
  component: InputRadio,
  argTypes: {
    style: { table: { disable: true } },
  },
};

const Template = (args) => (
  <InputRadio {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
};

export const AsBoolean = Template.bind({});
AsBoolean.args = {
  checked: false,
  children: 'simple radio',
};
AsBoolean.argTypes = {
  children: { table: { disable: true } },
  checked: { control: 'boolean' },
};

export const AsString = (args) => (
  <div>
    <InputRadio
      {...args}
      value="first"
    >
      Первый
      <br />
      test
    </InputRadio>
    <br />
    <InputRadio
      {...args}
      value="second"
    >
      Второй
    </InputRadio>
    <br />
    <InputRadio
      {...args}
      value="third"
    >
      Третий
    </InputRadio>
  </div>
);
AsString.args = {
  checked: 'first',
};
AsString.argTypes = {
  children: { table: { disable: true } },
  checked: {
    control: { type: 'radio' },
    options: ['first', 'second', 'third'],
  },
};
