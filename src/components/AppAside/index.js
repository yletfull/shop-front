/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useDispatch } from 'react-redux';
import IconLogo from '@/icons/Logo';
import IconLogout from '@/icons/Logout';
import IconAnalytics from '@/icons/Analytics';
import IconUpload from '@/icons/Upload';
import MenuItem from '@/components/MenuItem';
import { patchs, titles } from '@/router/routes';
import { authSignOut } from '../../store/auth/actions';
import styles from './styles.module.scss';

const AppAside = function AppAside() {
  const dispatch = useDispatch();

  const handleLogoutButtonClick = () => {
    dispatch(authSignOut());
  };

  const menuItemsList = [
    {
      title: titles.upload,
      to: patchs.upload,
      icon: <IconUpload />,
    },
    {
      title: titles.statistics,
      to: patchs.statistics,
      icon: <IconAnalytics />,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperTop}>
        <IconLogo />
        <div className={styles.menuItems}>
          {menuItemsList.map((menuItem, ind) => (
            <MenuItem
              key={ind}
              to={menuItem.to}
              icon={menuItem.icon}
              title={menuItem.title}
            />
          ))}
        </div>

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
