import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Condition from './index';

export default {
  title: 'Features/Segments/components/Condition',
  component: Condition,
  decorators: [
    (Story) => (
      <DndProvider backend={HTML5Backend}>
        <Story />
      </DndProvider>
    ),
  ],
};

const Template = (args) => <Condition {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  groupIndex: 0,
  index: 0,
  attributeId: 42,
  datasetIds: [],
  negation: false,
  equality: 'ANY',
  values: [],
  attribute: {
    id: 42,
    attributeName: 'education_level',
    title: '',
    datasets: [{ id: 1, name: 'initial' }],
    type: 'STRING',
    options: ['bachelor', 'magistracy', 'postgraduate-studies', 'specialty'],
  },
  profileTitle: 'Студенты',
};
