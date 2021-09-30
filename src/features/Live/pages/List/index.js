import React from 'react';
import LiveCardsArea from '../../components/LiveCardsArea';
import styles from './styles.module.scss';
import { cards } from './mocks';
import { platformsAdsComponents, platformsAdsSizes } from './constants';

const propTypes = {
};
const defaultProps = {
};

const getBanner = (card) => {
  const Banner = platformsAdsComponents[card.platform][card.placement];
  const sizes = platformsAdsSizes[card.platform][card.placement];

  return (
    <Banner
      title={card.title}
      content={card.content}
      device={card.device}
      href={card.href}
      icon={card.icon}
      sizes={sizes}
    />
  );
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
            onClick={handleCardClick}
          >
            {getBanner(card)}
          </LiveCardsArea.Card>
        ))}
      </LiveCardsArea>
    </div>
  );
};

Live.propTypes = propTypes;
Live.defaultProps = defaultProps;

export default Live;
