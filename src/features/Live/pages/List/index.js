import React from 'react';
import LiveCardsArea from '../../components/LiveCardsArea';
import styles from './styles.module.scss';
import { banners } from './mocks';

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
          />
        ))}
      </LiveCardsArea>
    </div>
  );
};

Live.propTypes = propTypes;
Live.defaultProps = defaultProps;

export default Live;
