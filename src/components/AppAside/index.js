/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useDispatch } from 'react-redux';
import IconLogo from '@/icons/Logo';
import IconLogout from '@/icons/Logout';
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
      title: titles.roles,
      to: patchs.roles,
      icon: <IconLogout />,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperTop}>
        <IconLogo />
        {menuItemsList.map((menuItem, ind) => (
          <MenuItem
            key={ind}
            to={menuItem.to}
            icon={menuItem.icon}
            title={menuItem.title}
          />
        ))}

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
