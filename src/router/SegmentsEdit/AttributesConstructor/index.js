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

const AttributesConstructor = function AttributesConstructor({
  children,
  isFetching,
}) {
  if (isFetching) {
    return (
      <Spinner />
    );
  }

  return (
    <div className={styles.attributesConstructor}>
      {children}
    </div>
  );
};

AttributesConstructor.propTypes = propTypes;
AttributesConstructor.defaultProps = defaultProps;

export default AttributesConstructor;
