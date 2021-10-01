import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
  stepX: PropTypes.number,
  stepYLimits: PropTypes.arrayOf(PropTypes.number),
  childWidth: PropTypes.number,
  moveSpeedX: PropTypes.number,
};
const defaultProps = {
  stepX: 350,
  stepYLimits: [0, 200],
  moveSpeedX: 0.25,
  childWidth: 100,
};

const LiveCardsArea = function LiveCardsArea({
  children,
  stepX,
  stepYLimits,
  moveSpeedX,
  childWidth,
}) {
  const [renderChildrenArr, setRendrerChildrenArr] = useState(children);

  const getMovedChild = useCallback((child, index, childrenArr) => {
    if (!child) {
      return;
    }

    const { key } = child;

    const top = index === 0
      ? 0
      : Math.random() * (stepYLimits[1] - stepYLimits[0]) + stepYLimits[0];

    const left = index === 0
      ? childWidth / 2
      : (childWidth + stepX) * index;

    const finalPositionX = -stepX * childrenArr.length * 1.5;
    const moveSpeed = moveSpeedX / childrenArr.length;

    return React.cloneElement(
      child,
      {
        key,
        style: {
          marginLeft: `${left}px`,
          marginTop: `${top}px`,
          transform: `translateX(${finalPositionX}px)`,
          transition: `transform ${1 / (moveSpeed || 1)}s linear`,
        },
      }
    );
  }, [moveSpeedX, stepX, stepYLimits, childWidth]);

  useEffect(() => {
    const movedChildren = children
      .map((child, ind) => getMovedChild(child, ind, children));
    setRendrerChildrenArr(movedChildren);
  }, [children, getMovedChild]);

  return (
    <div className={styles.wrapper}>
      {renderChildrenArr.map((child) => child)}
    </div>
  );
};

LiveCardsArea.propTypes = propTypes;
LiveCardsArea.defaultProps = defaultProps;

LiveCardsArea.Card = Card;

export default LiveCardsArea;
