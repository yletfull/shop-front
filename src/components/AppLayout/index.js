import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
};

const AppLayout = function AppLayout({
  children,
}) {
  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        {children}
      </main>
    </div>

  );
};

AppLayout.propTypes = propTypes;
AppLayout.defaultProps = defaultProps;

export default AppLayout;
