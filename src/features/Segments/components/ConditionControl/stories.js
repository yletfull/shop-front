import React from 'react';
import {
  attributeTypes,
  equalities,
} from '@/features/Segments/constants';
import ConditionControl from './index';

export default {
  title: 'Features/SegmentsEdit/components/ConditionControl',
  component: ConditionControl,
  argTypes: {
    type: {
      options: Object.values(attributeTypes),
      control: 'select',
    },
    equality: {
      options: Object.values(equalities),
      control: 'select',
    },
  },
};

const Template = (args) => (
  <ConditionControl {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
  negation: false,
  type: 'STRING',
  values: [],
  options: [],
  equality: 'ANY',
};

export const TypeString = Template.bind({});
TypeString.args = {
  negation: false,
  type: 'STRING',
  values: ['some string'],
  options: [],
  equality: 'EQUAL',
};

export const TypeDate = Template.bind({});
TypeDate.args = {
  negation: false,
  type: 'DATE',
  values: ['2021-07-22'],
  options: [],
  equality: 'LESSER_OR_EQUAL',
};

export const TypeNumber = Template.bind({});
TypeNumber.args = {
  negation: false,
  type: 'NUMERIC',
  values: ['42'],
  options: [],
  equality: 'EQUAL',
};

export const WithOptions = Template.bind({});
WithOptions.args = {
  negation: false,
  type: 'ENUM',
  values: [
    '0-17',
    '18-20',
    '41-45',
  ],
  options: [
    '0-17',
    '18-20',
    '21-25',
    '26-30',
    '31-35',
    '36-40',
    '41-45',
    '46-50',
    '51-55',
    '56-60',
    '61-65',
    '66-70',
    '71-75',
    '75+',
  ],
  equality: 'ANY',
};
