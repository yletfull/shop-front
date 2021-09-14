import dayjs from 'dayjs';
import React from 'react';
import TestImage from '@/images/TestImage.jpg';
import { DATE_FORMAT } from '../../constants';
import LiveCardsArea from '../../components/LiveCardsArea';
import styles from './styles.module.scss';

const cards = [
  {
    id: 1,
    date: dayjs().format(DATE_FORMAT),
    title: 'Событие 1. Текст',
    image: TestImage,
  },
  {
    id: 2,
    date: dayjs().format(DATE_FORMAT),
    title: 'Событие 2. Текст',
    image: TestImage,
  },
  {
    id: 3,
    date: dayjs().format(DATE_FORMAT),
    title: 'Событие 3. Текст',
    image: TestImage,
  },
  {
    id: 4,
    date: dayjs().format(DATE_FORMAT),
    title: 'Событие 4. Текст',
    image: TestImage,
  },
  {
    id: 5,
    date: dayjs().format(DATE_FORMAT),
    title: 'Событие 5. Текст',
    image: TestImage,
  },
  {
    id: 6,
    date: dayjs().format(DATE_FORMAT),
    title: 'Событие 6. Текст',
    image: TestImage,
  },
  {
    id: 7,
    date: dayjs().format(DATE_FORMAT),
    title: 'Событие 7. Текст',
    image: TestImage,
  },
];

const propTypes = {
};
const defaultProps = {
};

const Live = function Live({
  ...props
}) {
  const handleCardClick = () => {
  };

  return (
    <div
      className={styles.wrapper}
      {...props}
    >
      <LiveCardsArea>
        {cards.map((card) => (
          <LiveCardsArea.Card
            key={card.id}
            date={card.date}
            title={card.title}
            image={card.image}
            onClick={handleCardClick}
          />
        ))}
      </LiveCardsArea>
    </div>
  );
};

Live.propTypes = propTypes;
Live.defaultProps = defaultProps;

export default Live;
