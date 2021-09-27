import dayjs from 'dayjs';
import React from 'react';
import TestImage from '@/images/TestImage.jpg';
import { DATE_FORMAT } from '../../constants';
import LiveCardsArea from '../../components/LiveCardsArea';
import styles from './styles.module.scss';

const cards = [
  {
    id: 1,
    href: 'https://vk.com/adscreate',
    date: dayjs().format(DATE_FORMAT),
    title: 'Событие 1.',
    content: 'Контент 1.',
    image: TestImage,
  },
  {
    id: 2,
    href: 'https://vk.com/adscreate',
    date: dayjs().format(DATE_FORMAT),
    title: 'Событие 2.',
    content: 'Контент 2.',
    image: TestImage,
  },
  {
    id: 3,
    href: 'https://vk.com/adscreate',
    date: dayjs().format(DATE_FORMAT),
    title: 'Событие 3.',
    content: 'Контент 3.',
    image: TestImage,
  },
  {
    id: 4,
    href: 'https://vk.com/adscreate',
    date: dayjs().format(DATE_FORMAT),
    title: 'Событие 4.',
    content: 'Контент 4.',
    image: TestImage,
  },
  {
    id: 5,
    href: 'https://vk.com/adscreate',
    date: dayjs().format(DATE_FORMAT),
    title: 'Событие 5.',
    content: 'Контент 5.',
    image: TestImage,
  },
  {
    id: 6,
    href: 'https://vk.com/adscreate',
    date: dayjs().format(DATE_FORMAT),
    title: 'Событие 6.',
    content: 'Контент 6.',
    image: TestImage,
  },
  {
    id: 7,
    href: 'https://vk.com/adscreate',
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
            href={card.href}
            content={card.content}
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
