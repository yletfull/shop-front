import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import Card from './components/Card';

const propTypes = {
  children: PropTypes.node.isRequired,
  stepX: PropTypes.number,
  stepYLimits: PropTypes.arrayOf([
    PropTypes.number,
  ]),
  moveSpeedX: PropTypes.number,
};
const defaultProps = {
  stepX: 350,
  stepYLimits: [0, 200],
  moveSpeedX: 0.25,
};

const LiveCardsArea = function LiveCardsArea({
  children,
  stepX,
  stepYLimits,
  moveSpeedX,
}) {
  const getMovedChild = (child, index, childrenArr) => {
    const top = index === 0
      ? 0
      : Math.random() * (stepYLimits[1] - stepYLimits[0]) + stepYLimits[0];

    const left = index === 0 ? 0 : stepX * index;

    const finalPositionX = -stepX * childrenArr.length;

    const moveSpeed = moveSpeedX / childrenArr.length;

    return React.cloneElement(
      child,
      {
        moveSpeed,
        top,
        left,
        finalPositionX,
      }
    );
  };

  return (
    <div className={styles.wrapper}>
      {children.map((child, ind) => getMovedChild(child, ind, children))}
    </div>
  );
};

LiveCardsArea.propTypes = propTypes;
LiveCardsArea.defaultProps = defaultProps;

LiveCardsArea.Card = Card;

export default LiveCardsArea;
