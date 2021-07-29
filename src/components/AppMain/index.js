import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  header: PropTypes.node,
};

const defaultProps = {
  children: null,
  header: null,
};

const AppMain = function AppMain({
  children,
  header,
}) {
  return (
    <div className={styles.appMain}>
      <div className={styles.appMainHeader}>
        {header}
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
