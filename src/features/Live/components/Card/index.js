import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { platformsAdsComponents, platformsAdsSizes } from './constants';

const propTypes = {
  id: PropTypes.string.isRequired,
  finalPositionX: PropTypes.number.isRequired,
  dateFormat: PropTypes.string,
  children: PropTypes.node,
  top: PropTypes.number,
  left: PropTypes.number,
  moveSpeed: PropTypes.number,
  setRendrerChildrenArr: PropTypes.func,
  updateTimeInterval: PropTypes.number,
  onClick: PropTypes.func,
  bannerData: PropTypes.objectOf(PropTypes.any).isRequired,
};

const defaultProps = {
  dateFormat: 'DD.MM.YYYY HH:mm',
  children: null,
  top: 0,
  left: 0,
  moveSpeed: 0.25,
  updateTimeInterval: 1000,
  setRendrerChildrenArr: () => {},
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
  id,
  children,
  moveSpeed,
  top,
  left,
  finalPositionX,
  setRendrerChildrenArr,
  updateTimeInterval,
  bannerData,
  ...props
}) {
  const cardRef = useRef();

  const getResultCardArray = (cards, key) => cards.map((card) => {
    if (card.key === key) {
      return '';
    }

    return card;
  });

  useEffect(() => {
    const timeout = setTimeout(function run() {
      const cardRect = cardRef?.current?.getBoundingClientRect();

      if (cardRect && (cardRect.left < -cardRect.width)) {
        return setRendrerChildrenArr((prev) => getResultCardArray(prev, id));
      }

      return setTimeout(run, updateTimeInterval);
    }, updateTimeInterval);

    return () => clearTimeout(timeout);
  }, [id, setRendrerChildrenArr, updateTimeInterval]);

  const [finalPosition, setFinalPosition] = useState(0);

  useEffect(() => {
    if (cardRef.current) {
      setFinalPosition(finalPositionX);
    }
  }, [finalPositionX]);

  return (
    <div
      className={styles.wrapper}
      ref={cardRef}
      style={{
        left: `${left}px`,
        top: `${top}px`,
        transform: `translateX(${finalPosition}px)`,
        transition: `transform ${1 / (moveSpeed || 1)}s linear`,
      }}
      {...props}
    >
      {getBanner(bannerData)}

      {children}
    </div>
  );
};

LiveCard.propTypes = propTypes;
LiveCard.defaultProps = defaultProps;

export default LiveCard;
