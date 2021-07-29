import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import IconLogo from '@/icons/Logo';
import IconLogout from '@/icons/Logout';
import IconUpload from '@/icons/Upload';
import { patchs, titles } from '@/router/routes';
import { authSignOut } from '@/store/auth/actions';
import styles from './styles.module.scss';

const AppAside = function AppAside() {
  const dispatch = useDispatch();

  const handleLogoutButtonClick = () => {
    dispatch(authSignOut());
  };

  const menuItems = [
    {
      title: titles.upload,
      to: patchs.upload,
      icon: <IconUpload />,
    },
  ];

  return (
    <div className={styles.appAside}>
      <div className={styles.appAsideTop}>
        <IconLogo />
        <div className={styles.menuItems}>
          {menuItems.map(({ icon, title, to }) => (
            <NavLink
              key={to}
              to={to}
              title={title}
              className={styles.menuItem}
              activeClassName={styles.menuItemActive}
            >
              {icon}
            </NavLink>
          ))}
        </div>
      </div>
      <div className={styles.appAsideBottom}>
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
