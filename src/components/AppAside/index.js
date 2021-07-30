import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Button from '@/components/Button';
import IconAnalytics from '@/icons/Analytics';
import IconCog from '@/icons/Cog';
import IconCrop from '@/icons/CropAlt';
import IconLogo from '@/icons/Logo';
import IconLogout from '@/icons/Logout';
import IconRubleSign from '@/icons/RubleSign';
import IconSignalStream from '@/icons/SignalStream';
import IconTasks from '@/icons/Tasks';
import IconTvAlt from '@/icons/TvAlt';
import IconVK from '@/icons/Vk';
import IconUsers from '@/icons/Users';
import { patchs, titles } from '@/router/routes';
import { authSignOut } from '@/store/auth/actions';
import styles from './styles.module.scss';

const menuItems = {
  top: [
    {
      title: '',
      to: '/not-found',
      icon: (<IconCrop />),
    },
    {
      title: '',
      to: '/not-found',
      icon: (<IconUsers />),
    },
    {
      title: titles.upload,
      to: patchs.upload,
      icon: (<IconVK />),
    },
    {
      title: '',
      to: '/not-found',
      icon: (<IconAnalytics />),
    },
    {
      title: '',
      to: '/not-found',
      icon: (<IconTasks />),
    },
    {
      title: '',
      to: '/not-found',
      icon: (<IconRubleSign />),
    },
    {
      title: '',
      to: '/not-found',
      icon: (<IconSignalStream />),
    },
  ],
  bottom: [
    {
      title: '',
      to: '/not-found',
      icon: (<IconCog />),
    },
    {
      title: '',
      to: '/not-found',
      icon: (<IconTvAlt />),
    },
  ],
};

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
          {menuItems.top.map(({ icon, title, to }) => (
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
        <div className={styles.menuItems}>
          {menuItems.bottom.map(({ icon, title, to }) => (
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
