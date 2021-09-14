import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import styles from './styles.module.scss';

const propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  finalPositionX: PropTypes.number.isRequired,
  dateFormat: PropTypes.string,
  children: PropTypes.node,
  top: PropTypes.number,
  left: PropTypes.number,
  moveSpeed: PropTypes.number,
  setRendrerChildrenArr: PropTypes.func,
  updateTimeInterval: PropTypes.number,
};
const defaultProps = {
  dateFormat: 'DD.MM.YYYY HH:mm',
  children: null,
  top: 0,
  left: 0,
  moveSpeed: 0.25,
  updateTimeInterval: 1000,
  setRendrerChildrenArr: () => {},
};

const LiveCard = function LiveCard({
  id,
  title,
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
    <button
      className={styles.wrapper}
      type="button"
      ref={cardRef}
      style={{
        left: `${left}px`,
        top: `${top}px`,
        transform: `translateX(${finalPosition}px)`,
        transition: `transform ${1 / (moveSpeed || 1)}s linear`,
      }}
      {...props}
    >
      <img
        className={styles.image}
        src={image}
        alt={title}
      />

      <div className={styles.title}>
        {title}
      </div>

      <div className={styles.date}>
        {dayjs(date).format(dateFormat)}
      </div>

      {children}
    </button>
  );
};

LiveCard.propTypes = propTypes;
LiveCard.defaultProps = defaultProps;

export default LiveCard;
