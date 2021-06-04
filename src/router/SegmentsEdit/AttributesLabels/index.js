import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  isVisible: PropTypes.bool,
  labels: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  isVisible: false,
  labels: [],
};

const AttributesLabels = function AttributesLabels({
  isVisible,
  labels,
}) {
  if (!isVisible && 0) {
    return null;
  }

  return (
    <div className={styles.attributesLabels}>
      <span className={styles.attributesLabelsPlaceholder} />
      {labels.map((label) => (
        <span
          key={label}
          className={styles.attributesLabelsLabel}
        >
          {label}
        </span>
      ))}
    </div>
  );
};

AttributesLabels.propTypes = propTypes;
AttributesLabels.defaultProps = defaultProps;

export default AttributesLabels;
