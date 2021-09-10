import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import Card from './components/Card';

const propTypes = {
  children: PropTypes.node.isRequired,
};
const defaultProps = {
};

const LiveCardsArea = function LiveCardsArea({ children }) {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
};

LiveCardsArea.propTypes = propTypes;
LiveCardsArea.defaultProps = defaultProps;
LiveCardsArea.Card = Card;

export default LiveCardsArea;
