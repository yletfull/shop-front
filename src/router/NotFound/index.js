import React from 'react';
// import PropTypes from 'prop-types';
import AppMain from '@/components/AppMain';
import styles from './styles.module.scss';

const propTypes = {};
const defaultProps = {};

const NotFound = function NotFound() {
  return (
    <AppMain
      header={(
        <span>
          Oшибка 404. Нет такой страницы
        </span>
      )}
    >
      <div className={styles.notFound}>
        Oшибка 404. Нет такой страницы
      </div>
    </AppMain>
  );
};

NotFound.propTypes = propTypes;
NotFound.defaultProps = defaultProps;

export default NotFound;
