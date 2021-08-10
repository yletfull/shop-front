import React from 'react';
import {
  NavLink,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';
import { sections } from '@/features/Settings/constants';
import routes from '@/features/Settings/routes';
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
      <div className={styles.settingsSelect}>
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

      <Switch>
        {routes.map(({ path, Component }) => (
          <Route
            key={`settings-${path}`}
            path={`${url}/${path}`}
          >
            <Component />
          </Route>
        ))}
        <Route
          key="settings-main"
          path={url}
          exact
        >
          <Redirect to={`${url}/${routes[3].path}`} />
        </Route>
      </Switch>
    </AppMain>
  );
};

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;

export default Settings;
