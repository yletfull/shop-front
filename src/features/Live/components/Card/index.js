import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { platformsAdsTypes } from './constants';

const propTypes = {
  id: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  finalPositionX: PropTypes.number.isRequired,
  platform: PropTypes.string.isRequired,
  placement: PropTypes.string.isRequired,
  dateFormat: PropTypes.string,
  children: PropTypes.node,
  top: PropTypes.number,
  left: PropTypes.number,
  moveSpeed: PropTypes.number,
  setRendrerChildrenArr: PropTypes.func,
  updateTimeInterval: PropTypes.number,
  onClick: PropTypes.func,
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

const LiveCard = function LiveCard({
  id,
  href,
  title,
  content,
  date,
  dateFormat,
  image,
  children,
  moveSpeed,
  top,
  left,
  finalPositionX,
  setRendrerChildrenArr,
  updateTimeInterval,
  platform,
  placement,
  ...props
}) {
  const cardRef = useRef();
  const adsRef = useRef();
  const AdsContent = platformsAdsTypes[platform][placement];

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
      <AdsContent
        title={title}
        content={content}
        icon={image}
        image={image}
        ref={adsRef}
        href={href}
      />
    </div>
  );
};

LiveCard.propTypes = propTypes;
LiveCard.defaultProps = defaultProps;

export default LiveCard;
