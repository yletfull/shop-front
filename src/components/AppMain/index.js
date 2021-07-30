import React from 'react';
import PropTypes from 'prop-types';
import AppHeader from '@/components/AppHeader';
import styles from './styles.module.scss';

const propTypes = {
  backTo: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
      hash: PropTypes.string,
      state: PropTypes.objectOf(PropTypes.any),
    }),
  ]),
  children: PropTypes.node,
  header: PropTypes.node,
};

const defaultProps = {
  backTo: '',
  children: null,
  header: null,
};

const AppMain = function AppMain({
  backTo,
  children,
  header,
}) {
  return (
    <div className={styles.appMain}>
      <div className={styles.appMainHeader}>
        {header && (
          <AppHeader backTo={backTo}>
            {header}
          </AppHeader>
        )}
      </div>
      <div className={styles.appMainContent}>
        {children}
      </div>
    </div>
  );
};

AppMain.propTypes = propTypes;
AppMain.defaultProps = defaultProps;

export default AppMain;
