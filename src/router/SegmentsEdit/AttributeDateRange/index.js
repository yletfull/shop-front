import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
  datasets: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  from: '',
  to: '',
  datasets: [],
};

const AttributeDateRange = function AttributeDateRange({
  from,
  to,
  datasets,
}) {
  return (
    <div className={styles.attributeDataRange}>
      AttributeDateRange Component
      {from}
      {to}
      {JSON.stringify(datasets)}
    </div>
  );
};

AttributeDateRange.propTypes = propTypes;
AttributeDateRange.defaultProps = defaultProps;

export default AttributeDateRange;
