import React from 'react';
import LiveCardsArea from '../../components/LiveCardsArea';
import { devices } from '../../constants';
import styles from './styles.module.scss';
import { banners } from './mocks';
import { getRandomDevice } from './utils';

const propTypes = {
};
const defaultProps = {
};

const Live = function Live({
  ...props
}) {
  return (
    <div
      className={styles.wrapper}
      {...props}
    >
      <LiveCardsArea>
        {banners.map((banner) => (
          <LiveCardsArea.Card
            key={banner.id}
            bannerData={banner}
            device={getRandomDevice(Object.values(devices))}
          />
        ))}
      </LiveCardsArea>
    </div>
  );
};

Live.propTypes = propTypes;
Live.defaultProps = defaultProps;

export default Live;
