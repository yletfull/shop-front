import React from 'react';
import AllAds from './AllAds';
import UploadFile from './UploadFile';
import LastProcessed from './LastProcessed';
import VkSync from './VkSync';
import styles from './styles.module.scss';

const HeaderTemplates = function HeaderTemplatesScreen() {
  return (
    <div className={styles.headerTemplatesWrapper}>
      <LastProcessed className={styles.headerTemplate} />
      <UploadFile className={styles.headerTemplate} />
      <VkSync className={styles.headerTemplate} />
      <AllAds className={styles.headerTemplate} />
    </div>

  );
};

export default HeaderTemplates;
