import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import Card from './components/Card';

const propTypes = {
  children: PropTypes.node.isRequired,
  steepX: PropTypes.number,
  steepYLimits: PropTypes.arrayOf([
    PropTypes.number,
  ]),
};
const defaultProps = {
  steepX: 75,
  steepYLimits: [0, 200],
};

const LiveCardsArea = function LiveCardsArea({
  children,
  steepX,
  steepYLimits,
}) {
  const getMovedChild = (child, ind) => {
    const marginTop = ind === 0 ? 0 : `${Math.random() * (steepYLimits[1] - steepYLimits[0]) + steepYLimits[0]}px`;
    const marginLeft = ind === 0 ? 0 : `${steepX}px`;

    return React.cloneElement(
      child,
      {
        style: {
          marginTop,
          marginLeft,
        },
      }
    );
  };

  return (
    <div className={styles.wrapper}>
      {children.map((child, ind) => getMovedChild(child, ind))}
    </div>
  );
};

LiveCardsArea.propTypes = propTypes;
LiveCardsArea.defaultProps = defaultProps;

LiveCardsArea.Card = Card;

export default LiveCardsArea;
