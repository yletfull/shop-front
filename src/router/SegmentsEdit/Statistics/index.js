import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from '@/utils/format';
import Spinner from '@/components/Spinner';
import styles from './styles.module.scss';

const propTypes = {
  isFetching: PropTypes.bool,
  emailsCount: PropTypes.number,
  phonesCount: PropTypes.number,
  error: PropTypes.shape({
    status: PropTypes.number,
  }),
};
const defaultProps = {
  isFetching: false,
  emailsCount: 0,
  phonesCount: 0,
  error: null,
};

const Statistics = function Statistics({
  isFetching,
  emailsCount,
  phonesCount,
  error,
}) {
  return (
    <table className={styles.statistics}>
      <tbody>
        {isFetching && (
          <tr>
            <td colSpan="2">
              <Spinner />
            </td>
          </tr>
        )}

        {!isFetching && (
          <Fragment>
            <tr>
              <td>
                E-mail
              </td>
              <td>
                {formatNumber(emailsCount)}
              </td>
            </tr>
            <tr>
              <td>
                Телефонов
              </td>
              <td>
                {formatNumber(phonesCount)}
              </td>
            </tr>
          </Fragment>
        )}

        {error && (
          <tr>
            <td colSpan="2">
              <span className={styles.statisticsError}>
                Возникла ошибка
                {error?.status && ` (Код ошибки: ${error?.status})`}
              </span>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

Statistics.propTypes = propTypes;
Statistics.defaultProps = defaultProps;

export default Statistics;
