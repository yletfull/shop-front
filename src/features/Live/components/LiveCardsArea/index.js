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
  steepX: 350,
  steepYLimits: [0, 200],
};

const LiveCardsArea = function LiveCardsArea({
  children,
  steepX,
  steepYLimits,
}) {
  const getMovedChild = (child, ind) => {
    const top = ind === 0 ? 0 : `${Math.random() * (steepYLimits[1] - steepYLimits[0]) + steepYLimits[0]}px`;
    const left = ind === 0 ? 0 : `${ind * steepX}px`;

    return React.cloneElement(
      child,
      {
        style: {
          position: 'absolute',
          left,
          top,
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
