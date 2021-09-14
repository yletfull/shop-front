import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import styles from './styles.module.scss';

const propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  dateFormat: PropTypes.string,
  image: PropTypes.string,
  children: PropTypes.node,
  top: PropTypes.number,
  left: PropTypes.number,
  moveSpeed: PropTypes.number,
  finalPositionX: PropTypes.number,
  index: PropTypes.number,
  setRendrerChildrenArr: PropTypes.func,
};
const defaultProps = {
  dateFormat: 'DD.MM.YYYY HH:mm',
  image: null,
  children: null,
  top: 0,
  left: 0,
  moveSpeed: 0.25,
  finalPositionX: 0,
  index: 0,
  setRendrerChildrenArr: () => {},
};

const LiveCard = function LiveCard({
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
  index,
  ...props
}) {
  const cardRef = useRef();

  useEffect(() => {
    const timeout = setTimeout(function run() {
      const position = cardRef?.current?.getBoundingClientRect();
      if (position && index === 0 && position.x < -220) {
        setRendrerChildrenArr((prev) => prev.filter((_, ind) => ind !== index));
      }
      setTimeout(run, 100);
    }, 100);

    return () => clearTimeout(timeout);
  }, [index, setRendrerChildrenArr]);

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
