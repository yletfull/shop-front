/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  text: PropTypes.string,
};

const defaultProps = {
  text: '-',
};

const Tag = function Tag(props) {
  const {
    text,
  } = props;

  return (
    <span
      className={styles.tag}
    >
      {text}
    </span>

  );
};

Tag.propTypes = propTypes;
Tag.defaultProps = defaultProps;

export default Tag;
