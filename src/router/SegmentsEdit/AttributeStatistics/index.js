import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from '@/components/Spinner';
import { formatNumber } from '@/utils/format';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.shape({
    isFetching: PropTypes.bool,
    emails: PropTypes.number,
    phones: PropTypes.number,
  }),
};
const defaultProps = {
  data: {},
};

const AttributeStatistics = function AttributeStatistics({ data }) {
  const { isFetching, emails, phones } = data || {};
  return (
    <div className={styles.attributeStatistics}>
      {isFetching && (
        <span className={styles.attributeStatisticsSpinner}>
          <Spinner />
        </span>
      )}
      {!isFetching && (
        <Fragment>
          <span className={styles.attributeStatisticsValue}>
            {phones ? formatNumber(phones) : '-'}
          </span>
          <span className={styles.attributeStatisticsValue}>
            {emails ? formatNumber(emails) : '-'}
          </span>
        </Fragment>
      )}
    </div>
  );
};

AttributeStatistics.propTypes = propTypes;
AttributeStatistics.defaultProps = defaultProps;

export default AttributeStatistics;
