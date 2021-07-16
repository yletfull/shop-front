import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from '@/utils/format';
import styles from './styles.module.scss';

const propTypes = {
  count: PropTypes.number,
  label: PropTypes.string.isRequired,
};

const defaultProps = {
  count: 0,
};

const CommonInfoCard = function CommonInfoCard({
  count,
  label,
}) {
  return (
    <div className={styles.commonInfoCard}>
      <span className={styles.commonInfoCardCount}>
        {formatNumber(count)}
      </span>
      <span className={styles.commonInfoCardLabel}>
        {label}
      </span>
    </div>
  );
};

CommonInfoCard.propTypes = propTypes;
CommonInfoCard.defaultProps = defaultProps;

export default CommonInfoCard;
