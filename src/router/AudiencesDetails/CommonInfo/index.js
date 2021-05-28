import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.objectOf(PropTypes.string),
};

const defaultProps = {
  data: {},
};

const CommonInfo = function CommonInfo({ data }) {
  return (
    <div className={styles.commonInfo}>
      {JSON.stringify(data)}
    </div>
  );
};

CommonInfo.propTypes = propTypes;
CommonInfo.defaultProps = defaultProps;

export default CommonInfo;
