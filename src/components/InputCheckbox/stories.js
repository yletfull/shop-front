import React from 'react';
import Checkbox from './index';

export default {
  title: 'Components/InputCheckbox',
  component: Checkbox,
  argTypes: {
    style: { table: { disable: true } },
  },
};

export const Playground = (args) => <Checkbox {...args} />;
Playground.args = {
};

export const AsArray = (args) => (
  <div>
    <Checkbox
      {...args}
      value="first"
    >
      Первый
    </Checkbox>
    <br />
    <Checkbox
      {...args}
      value="second"
    >
      Второй
    </Checkbox>
    <br />
    <Checkbox
      {...args}
      value="third"
    >
      Третий
    </Checkbox>
  </div>
);
AsArray.argTypes = {
  children: { table: { disable: true } },
  checked: {
    control: { type: 'check' },
    options: ['first', 'second', 'third'],
  },
};
AsArray.args = {
  checked: ['first'],
};

export const AsString = (args) => (
  <Checkbox {...args}>
    {/* eslint-disable-next-line */}
    {args.value}
  </Checkbox>
);
AsString.argTypes = {
  children: { table: { disable: true } },
  checked: { control: 'text' },
};
AsString.args = {
  checked: '',
};

export const AsBoolean = (args) => (
  <Checkbox {...args}>
    {/* eslint-disable-next-line */}
    {args.value}
  </Checkbox>
);
AsBoolean.argTypes = {
  children: { table: { disable: true } },
  checked: { control: 'boolean' },
};
AsArray.args = {
  checked: false,
};
