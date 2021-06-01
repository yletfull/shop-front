import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '@/components/Spinner';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  isFetching: PropTypes.bool,
};

const defaultProps = {
  children: null,
  isFetching: false,
};

const Constructor = function Constructor({ children, isFetching }) {
  if (isFetching) {
    return (
      <Spinner />
    );
  }

  return (
    <div className={styles.construct}>
      {children}
    </div>
  );
};

Constructor.propTypes = propTypes;
Constructor.defaultProps = defaultProps;

export default Constructor;
