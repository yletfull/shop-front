import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.objectOf(PropTypes.string),
};

const defaultProps = {
  data: {},
};

const SegmentAudience = function SegmentAudience({ data }) {
  return (
    <div className={styles.segmentAudience}>
      {JSON.stringify(data)}
    </div>
  );
};

SegmentAudience.propTypes = propTypes;
SegmentAudience.defaultProps = defaultProps;

export default SegmentAudience;
