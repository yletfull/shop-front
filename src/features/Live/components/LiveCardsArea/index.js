import React, { useCallback, useEffect, useState } from 'react';
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
  updateTimeInterval: PropTypes.number,
};
const defaultProps = {
  stepX: 350,
  stepYLimits: [0, 200],
  moveSpeedX: 0.15,
  updateTimeInterval: 1000,
};

const LiveCardsArea = function LiveCardsArea({
  children,
  stepX,
  stepYLimits,
  moveSpeedX,
  updateTimeInterval,
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
      ? 0
      : stepX * index;

    const finalPositionX = -stepX * childrenArr.length;
    const moveSpeed = moveSpeedX / childrenArr.length;

    return React.cloneElement(
      child,
      {
        key,
        moveSpeed,
        top,
        left,
        finalPositionX,
        updateTimeInterval,
        id: key,
        setRendrerChildrenArr,
      }
    );
  }, [moveSpeedX, stepX, stepYLimits, updateTimeInterval]);

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
