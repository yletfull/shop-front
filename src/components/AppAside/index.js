import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Button from '@/components/Button';
import withCheckRights from '@/components/withCheckRights';
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
import { rights } from '@/constants';
import { patchs, titles } from '@/router/routes';
import { authSignOut } from '@/store/auth/actions';
import styles from './styles.module.scss';

const urlNotFound = '/not-found';
const menuItems = {
  top: [
    {
      key: 'segments',
      section: rights.sections.segment,
      title: titles.segments,
      to: patchs.segments || urlNotFound,
      icon: (<IconCrop />),
    },
    {
      key: 'audiences',
      section: '',
      title: titles.audiencesList,
      to: patchs.audiencesList || urlNotFound,
      icon: (<IconUsers />),
    },
    {
      key: 'upload',
      section: '',
      title: titles.upload,
      to: patchs.upload || urlNotFound,
      icon: (<IconVK />),
    },
    {
      key: 'statistics',
      section: rights.sections.stats,
      title: titles.statistics,
      to: patchs.statistics || urlNotFound,
      icon: (<IconAnalytics />),
    },
    {
      key: 'tasks',
      section: rights.sections.task,
      title: '',
      to: urlNotFound,
      icon: (<IconTasks />),
    },
    {
      key: 'money',
      section: '',
      title: '',
      to: urlNotFound,
      icon: (<IconRubleSign />),
    },
    {
      key: 'stream',
      section: '',
      title: '',
      to: urlNotFound,
      icon: (<IconSignalStream />),
    },
  ],
  bottom: [
    {
      key: 'settings',
      section: rights.sections.user,
      title: titles.settings,
      to: patchs.settings || urlNotFound,
      icon: (<IconCog />),
    },
    {
      key: 'tv',
      section: '',
      title: '',
      to: urlNotFound,
      icon: (<IconTvAlt />),
    },
  ],
};

const AppAside = function AppAside() {
  const dispatch = useDispatch();

  const handleLogoutButtonClick = () => {
    dispatch(authSignOut());
  };

  const filterAvailablePages = ({ to }) => to && to !== urlNotFound;
  const LinkWithCheckRights = withCheckRights(NavLink);

  return (
    <div className={styles.appAside}>
      <div className={styles.appAsideTop}>
        <div className={styles.appAsideLogo}>
          <IconLogo />
        </div>
        <div className={styles.menuItems}>
          {menuItems.top
            .filter(filterAvailablePages)
            .map(({ key, icon, section, title, to }) => (
              <LinkWithCheckRights
                key={key}
                section={section}
                to={to}
                title={title}
                className={styles.menuItem}
                activeClassName={styles.menuItemActive}
              >
                {icon}
              </LinkWithCheckRights>
            ))}
        </div>
      </div>
      <div className={styles.appAsideBottom}>
        <div className={styles.menuItems}>
          {menuItems.bottom
            .filter(filterAvailablePages)
            .map(({ key, icon, section, title, to }) => (
              <LinkWithCheckRights
                key={key}
                section={section}
                to={to}
                title={title}
                className={styles.menuItem}
                activeClassName={styles.menuItemActive}
              >
                {icon}
              </LinkWithCheckRights>
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
