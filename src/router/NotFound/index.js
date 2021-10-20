import React from 'react';
import styles from './styles.module.scss';

const propTypes = {};
const defaultProps = {};

const NotFound = function NotFound() {
  return (
    <div className={styles.notFound}>
      Oшибка 404. Нет такой страницы
    </div>
  );
};

NotFound.propTypes = propTypes;
NotFound.defaultProps = defaultProps;

export default NotFound;
