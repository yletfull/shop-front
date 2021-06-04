import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from '@/utils/format';
import styles from './styles.module.scss';

const propTypes = {
  emailsCount: PropTypes.number,
  phonesCount: PropTypes.number,
};
const defaultProps = {
  emailsCount: 0,
  phonesCount: 0,
};

const Statistics = function Statistics({
  emailsCount,
  phonesCount,
}) {
  return (
    <table className={styles.statistics}>
      <tbody>
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
      </tbody>
    </table>
  );
};

Statistics.propTypes = propTypes;
Statistics.defaultProps = defaultProps;

export default Statistics;
