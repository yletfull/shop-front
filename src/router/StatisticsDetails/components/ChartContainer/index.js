import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  header: PropTypes.node,
};

const defaultProps = {
  children: null,
  header: null,
};

const ChartContainer = function ChartContainer({
  children,
  header,
}) {
  return (
    <div className={styles.chartContainer}>
      {header && (
        <div className={styles.chartContainerHeader}>
          {header}
        </div>
      )}
      {children}
    </div>
  );
};

ChartContainer.propTypes = propTypes;
ChartContainer.defaultProps = defaultProps;

export default ChartContainer;
