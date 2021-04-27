import React from 'react';
import IconLogo from '@/icons/Logo';
import IconLogout from '@/icons/Logout';
import styles from './styles.module.scss';


const AppAside = function AppAside() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperTop}>
        <IconLogo />
      </div>
      <div className={styles.wrapperBottom}>
        <button
          className="button-control"
          type="button"
        >
          <IconLogout />
        </button>
      </div>
    </div>

  );
};

export default AppAside;
