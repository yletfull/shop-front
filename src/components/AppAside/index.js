import React from 'react';
import IconLogo from '@/icons/Logo.svg';
import IconLogout from '@/icons/Logout.svg';
import styles from './styles.module.scss';


const AppAside = function AppAside() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperTop}>
        <img
          src={IconLogo}
          className={styles.icon}
          alt="logo"
        />
      </div>
      <div className={styles.wrapperBottom}>
        <button
          className="button-control"
          type="button"
        >
          <img
            src={IconLogout}
            className={styles.iconLogut}
            alt="logout"
          />
        </button>
      </div>
    </div>

  );
};

export default AppAside;
