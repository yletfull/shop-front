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
      key: 'not-found-0',
      title: '',
      to: '/not-found',
      icon: (<IconCrop />),
    },
    {
      key: 'not-found-1',
      title: '',
      to: '/not-found',
      icon: (<IconUsers />),
    },
    {
      key: patchs.upload,
      title: titles.upload,
      to: patchs.upload,
      icon: (<IconVK />),
    },
    {
      key: 'not-found-3',
      title: '',
      to: '/not-found',
      icon: (<IconAnalytics />),
    },
    {
      key: 'not-found-4',
      title: '',
      to: '/not-found',
      icon: (<IconTasks />),
    },
    {
      key: 'not-found-5',
      title: '',
      to: '/not-found',
      icon: (<IconRubleSign />),
    },
    {
      key: 'not-found-6',
      title: '',
      to: '/not-found',
      icon: (<IconSignalStream />),
    },
  ],
  bottom: [
    {
      key: 'not-found-7',
      title: '',
      to: '/not-found',
      icon: (<IconCog />),
    },
    {
      key: 'not-found-8',
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
          {menuItems.top.map(({ key, icon, title, to }) => (
            <NavLink
              key={key}
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
          {menuItems.bottom.map(({ key, icon, title, to }) => (
            <NavLink
              key={key}
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
