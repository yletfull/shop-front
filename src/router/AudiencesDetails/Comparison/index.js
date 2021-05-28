import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.objectOf(PropTypes.string),
};

const defaultProps = {
  data: {},
};

const Comparison = function Comparison({ data }) {
  return (
    <div className={styles.comparison}>
      {JSON.stringify(data)}
    </div>
  );
};

Comparison.propTypes = propTypes;
Comparison.defaultProps = defaultProps;

export default Comparison;
