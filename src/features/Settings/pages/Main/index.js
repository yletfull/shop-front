import React from 'react';
import PageHeader from '@/components/PageHeader';
import AppMain from '@/components/AppMain';
import styles from './styles.module.scss';

const propTypes = {};
const defaultProps = {};

const Settings = function Settings() {
  return (
    <AppMain
      className={styles.settings}
      header={(
        <PageHeader>
          Настройки
        </PageHeader>
      )}
    >
      Settings
    </AppMain>
  );
};

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;

export default Settings;
