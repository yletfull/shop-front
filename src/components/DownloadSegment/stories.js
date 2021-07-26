import React from 'react';
import DownloadSegment from './index';

export default {
  title: 'Components/DownloadSegment',
  component: DownloadSegment,
  argTypes: {
  },
};

const Template = (args) => (
  <DownloadSegment {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
};
