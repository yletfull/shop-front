import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { formatNumber, formatPercent } from '@/utils/format';
import NumberGrowth from '@/components/NumberGrowth';
import styles from './styles.module.scss';

const propTypes = {
  value: PropTypes.number,
  diff: PropTypes.number,
  icon: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  value: null,
  diff: 0,
  className: '',
};

const StatisticsErrorMessage = function StatisticsErrorMessage({
  value,
  diff,
  icon,
  className,
  ...props
}) {
  return (
    <div
      className={cx([
        styles.wrapper,
        className,
      ])}
      {...props}
    >
      <div>
        {value ? formatNumber(value) : '—'}
      </div>
      <NumberGrowth
        className={styles.diff}
        renderZero
        value={diff}
        formatter={formatPercent}
      />
      <span
        className={styles.icon}
      >
        {icon}
      </span>
    </div>
  );
};

StatisticsErrorMessage.propTypes = propTypes;
StatisticsErrorMessage.defaultProps = defaultProps;

export default StatisticsErrorMessage;
