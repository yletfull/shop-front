import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { platformsAdsComponents, platformsAdsSizes } from './constants';

const propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  bannerData: PropTypes.objectOf(PropTypes.any).isRequired,
  device: PropTypes.string.isRequired,
};

const defaultProps = {
  children: null,
  onClick: () => {},
};

const getBanner = (card, device) => {
  const Banner = platformsAdsComponents[card.platform][card.placement];
  const sizes = platformsAdsSizes[card.platform][card.placement][device];

  return (
    <Banner
      title={card.title}
      content={card.content}
      href={card.href}
      icon={card.icon}
      device={device}
      sizes={sizes}
    />
  );
};

const LiveCard = function LiveCard({
  children,
  bannerData,
  device,
  ...props
}) {
  const cardRef = useRef();

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
        {getBanner(bannerData, device)}

        {children}
      </div>
    )

  );
};

LiveCard.propTypes = propTypes;
LiveCard.defaultProps = defaultProps;

export default LiveCard;
