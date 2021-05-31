import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  title: PropTypes.string,
};

const defaultProps = {
  title: '',
};

const AttributeEnum = function AttributeEnum({ title }) {
  return (
    <div className={styles.wrapper}>
      AttributeEnum
      {title}
    </div>
  );
};

AttributeEnum.propTypes = propTypes;
AttributeEnum.defaultProps = defaultProps;

export default AttributeEnum;
