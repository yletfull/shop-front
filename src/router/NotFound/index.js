import React from 'react';
// import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {};
const defaultProps = {};

const NotFound = function NotFound() {
  return (
    <div className={styles.notFound}>
      404 Page Not Found
    </div>
  );
};

NotFound.propTypes = propTypes;
NotFound.defaultProps = defaultProps;

export default NotFound;
