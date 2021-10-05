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
  headerType: PropTypes.string,
};

const defaultProps = {
  backTo: '',
  children: null,
  header: null,
  headerType: '',
};

const AppMain = function AppMain({
  backTo,
  children,
  header,
  headerType,
}) {
  return (
    <div className={styles.appMain}>
      {header && (
        <AppHeader
          backTo={backTo}
          headerType={headerType}
        >
          {header}
        </AppHeader>
      )}
      <div className={styles.appMainContent}>
        {children}
      </div>
    </div>
  );
};

AppMain.propTypes = propTypes;
AppMain.defaultProps = defaultProps;

export default AppMain;
