import React from 'react';
import AllAds from './AllAds';
import UploadFile from './UploadFile';
import LastProcessed from './LastProcessed';
import styles from './styles.module.scss';

const Header = function HeaderScreen() {
  return (
    <div className={styles.headerTemplatesWrapper}>
      <LastProcessed className={styles.headerTemplate} />
      <UploadFile className={styles.headerTemplate} />
      <AllAds className={styles.headerTemplate} />
    </div>

  );
};

export default Header;
