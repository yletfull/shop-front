import React from 'react';
import { useDispatch } from 'react-redux';
import IconLogo from '@/icons/Logo';
import IconLogout from '@/icons/Logout';
import { authSignOut } from '../../store/auth/actions';
import styles from './styles.module.scss';


const AppAside = function AppAside() {
  const dispatch = useDispatch();

  const handleLogoutButtonClick = () => {
    dispatch(authSignOut());
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperTop}>
        <IconLogo />
      </div>
      <div className={styles.wrapperBottom}>
        <button
          className="button-control"
          type="button"
          onClick={handleLogoutButtonClick}
        >
          <IconLogout />
        </button>
      </div>
    </div>

  );
};

export default AppAside;
