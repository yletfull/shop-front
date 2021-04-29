import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  headerTitle: PropTypes.string,
};

const defaultProps = {
  headerTitle: '',
};

const AppHeader = function AppHeader(props) {
  const { headerTitle } = props;

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>
        {headerTitle}
      </span>
    </div>

  );
};

AppHeader.propTypes = propTypes;
AppHeader.defaultProps = defaultProps;

export default AppHeader;
