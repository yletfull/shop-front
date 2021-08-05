import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { sections } from '@/features/Settings/constants';
import PageHeader from '@/components/PageHeader';
import AppMain from '@/components/AppMain';
import styles from './styles.module.scss';

const propTypes = {};
const defaultProps = {};

const Settings = function Settings() {
  const { url } = useRouteMatch();
  return (
    <AppMain
      className={styles.settings}
      header={(
        <PageHeader>
          Настройки
        </PageHeader>
      )}
    >
      <div className={styles.settingSelect}>
        {sections.map(({ key, label, to }) => (
          <NavLink
            key={key}
            to={`${url}/${to}`}
            className={styles.settingsSelectLink}
            activeClassName={styles.settingsSelectLinkActive}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </AppMain>
  );
};

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;

export default Settings;
