import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { platformsAdsComponents, platformsAdsSizes } from './constants';

const propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  bannerData: PropTypes.objectOf(PropTypes.any).isRequired,
};

const defaultProps = {
  children: null,
  onClick: () => {},
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

const LiveCard = function LiveCard({
  children,
  bannerData,
  ...props
}) {
  const cardRef = useReducer();
  const [isShown, setIsShown] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(function run() {
      const cardRect = cardRef?.current?.getBoundingClientRect();

      if (cardRect && (cardRect.left < -cardRect.width)) {
        return setIsShown(false);
      }

      return setTimeout(run, 1000);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [cardRef]);

  return (
    isShown && (
      <div
        className={styles.wrapper}
        ref={cardRef}
        {...props}
      >
        {getBanner(bannerData)}

        {children}
      </div>
    )

  );
};

LiveCard.propTypes = propTypes;
LiveCard.defaultProps = defaultProps;

export default LiveCard;
