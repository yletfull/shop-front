import React from 'react';
import PropTypes from 'prop-types';
import IconAnalytics from '@/icons/Analytics';
import styles from './styles.module.scss';

const propTypes = {
  icon: PropTypes.node,
  children: PropTypes.node,
};
const defaultProps = {
  icon: <IconAnalytics />,
  children: 'Ничего не найдено',
};

const EmptyState = function StatisticsEmptyState({
  icon,
  children,
}) {
  return (
    <div className={styles.empty}>
      <div className={styles.emptyIcon}>
        {icon}
      </div>
      <div className={styles.emptyBody}>
        {children}
      </div>
    </div>
  );
};

EmptyState.propTypes = propTypes;
EmptyState.defaultProps = defaultProps;

export default EmptyState;
