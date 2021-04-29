/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Indicator from '@/components/Indicator';

import styles from './styles.module.scss';


const propTypes = {
  params: PropTypes.arrayOf(PropTypes.any).isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

const NavigationBar = function NavigationBar(props) {
  const { className, params } = props;

  // const params = {
  //   prev: [],
  //   current: '',
  //   next: [],
  // };

  return (
    <div
      className={cx(styles.wrapper, className)}
    >
      {(params.prev.length > 0) && params.prev.map(
        (el, prevInd) => (
          <div
            key={prevInd}
            className={styles.item}
          >
            <span className={styles.prevText}>
              {el}
            </span>
            <Indicator color="green" />
          </div>
        )
      )}
      <div className={styles.item}>
        <span className={styles.currentText}>
          {params.current}
        </span>
        <Indicator color="red" />
      </div>
      {(params.next.length > 0) && params.next.map(
        (el, nextId) => (
          <div
            key={nextId}
            className={styles.item}
          >
            <span className={styles.nextText}>
              {el}
            </span>
          </div>
        )
      )}
    </div>

  );
};

NavigationBar.propTypes = propTypes;
NavigationBar.defaultProps = defaultProps;

export default NavigationBar;
