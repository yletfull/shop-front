import React from 'react';
import dayjs from 'dayjs';
import TestImage from '@/images/TestImage.jpg';
import LiveCardsArea from './index';

export default {
  title: 'features/Live/LiveCardsArea',
  component: LiveCardsArea,
};

const cards = [
  {
    id: 1,
    date: dayjs(),
    title: 'Событие 1. Текст',
    image: TestImage,
  },
  {
    id: 2,
    date: dayjs(),
    title: 'Событие 2. Текст',
    image: TestImage,
  },
  {
    id: 3,
    date: dayjs(),
    title: 'Событие 3. Текст',
    image: TestImage,
  },
  {
    id: 4,
    date: dayjs(),
    title: 'Событие 4. Текст',
    image: TestImage,
  },
];

const Template = (args) => (
  <LiveCardsArea {...args}>
    {cards.map((card) => (
      <LiveCardsArea.Card
        key={card.id}
        date={card.date}
        title={card.title}
        image={card.image}
        onClick={() => {}}
      />
    ))}
  </LiveCardsArea>
);

export const Playground = Template.bind({});
Playground.args = {
  stepX: 350,
  stepYLimits: [0, 200],
  moveSpeedX: 0.15,
};
