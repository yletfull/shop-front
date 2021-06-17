/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useDispatch } from 'react-redux';
import IconCrop from '@/icons/Crop';
import IconLogo from '@/icons/Logo';
import IconUsers from '@/icons/Users';
import IconLogout from '@/icons/Logout';
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
      title: titles.segments,
      to: patchs.segments,
      icon: <IconCrop />,
    },
    {
      title: titles.upload,
      to: patchs.upload,
      icon: <IconUpload />,
    },
    {
      title: titles.users,
      to: patchs.users,
      icon: <IconUsers />,
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
