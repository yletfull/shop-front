import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.number),
};
const defaultProps = {
  data: [],
};

const AttributeStatistics = function AttributeStatistics({ data }) {
  return (
    <div className={styles.attributeStatistics}>
      {JSON.stringify(data)}
    </div>
  );
};

AttributeStatistics.propTypes = propTypes;
AttributeStatistics.defaultProps = defaultProps;

export default AttributeStatistics;
