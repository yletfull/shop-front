import React from 'react';
import PropTypes from 'prop-types';
import AppHeader from '@/components/AppHeader';
import AppAside from '@/components/AppAside';
import styles from './styles.module.scss';

const propTypes = {
  headerTitle: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

const defaultProps = {
  headerTitle: '',
  children: null,
};

const AppLayout = function AppLayout(props) {
  const { headerTitle, children } = props;
  return (
    <div className={styles.wrapper}>
      <AppAside />
      <main className={styles.main}>
        <AppHeader headerTitle={headerTitle} />
        {children && children}
      </main>
    </div>

  );
};

AppLayout.propTypes = propTypes;
AppLayout.defaultProps = defaultProps;

export default AppLayout;
