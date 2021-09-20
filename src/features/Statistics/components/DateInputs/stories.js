import dayjs from 'dayjs';
import React from 'react';
import { DATE_FORMAT } from './constants';
import DateInputs from './index';

export default {
  title: 'Features/Statistics/components/DateInputs',
  component: DateInputs,
};

const Template = (args) => <DateInputs {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  min: dayjs('2000.01.01').format(DATE_FORMAT),
  max: dayjs('2100.01.01').format(DATE_FORMAT),
  values: {
    dateStart: dayjs('2021.01.01').format(DATE_FORMAT),
    dateEnd: dayjs('2021.12.31').format(DATE_FORMAT),
  },
};
