import React from 'react';
import LiveCardsArea from '../../components/LiveCardsArea';
import styles from './styles.module.scss';
import { cards } from './mocks';

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
            platform={card.platform}
            placement={card.placement}
            device={card.device}
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
