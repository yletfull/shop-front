import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconChevronLeft from '@/icons/ChevronLeft';
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
  headerTitle: PropTypes.string,
};

const defaultProps = {
  backTo: '',
  children: null,
  headerTitle: '',
};

const AppHeader = function AppHeader({
  backTo,
  children,
  headerTitle,
}) {
  return (
    <div className={styles.appHeader}>
      {backTo && (
        <Link
          to={backTo}
          className={styles.appHeaderLink}
        >
          <IconChevronLeft />
        </Link>
      )}
      {children}
      <span className={styles.title}>
        {headerTitle}
      </span>
    </div>

  );
};

AppHeader.propTypes = propTypes;
AppHeader.defaultProps = defaultProps;

export default AppHeader;
