import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Button from '@/components/Button';
import IconCrop from '@/icons/CropAlt';
import IconLogo from '@/icons/Logo';
import IconLogout from '@/icons/Logout';
import IconVK from '@/icons/Vk';
import { patchs, titles } from '@/router/routes';
import { authSignOut } from '@/store/auth/actions';
import styles from './styles.module.scss';

const menuItems = [
  {
    title: '',
    to: '/not-found',
    icon: (<IconCrop />),
  },
  {
    title: titles.upload,
    to: patchs.upload,
    icon: (<IconVK />),
  },
];

const AppAside = function AppAside() {
  const dispatch = useDispatch();

  const handleLogoutButtonClick = () => {
    dispatch(authSignOut());
  };

  return (
    <div className={styles.appAside}>
      <div className={styles.appAsideTop}>
        <div className={styles.appAsideLogo}>
          <IconLogo />
        </div>
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
        <Button
          appearance="control"
          className={styles.appAsideButton}
          onClick={handleLogoutButtonClick}
        >
          <IconLogout />
        </Button>
      </div>
    </div>

  );
};

export default AppAside;
