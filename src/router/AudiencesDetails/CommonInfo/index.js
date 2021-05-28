import React from 'react';
import PropTypes from 'prop-types';
import { formatDate, formatNumber } from '@/utils/format';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.objectOf(PropTypes.string),
};

const defaultProps = {
  data: {},
};

const CommonInfo = function CommonInfo({ data }) {
  return (
    <table className={styles.commonInfo}>
      <tbody>
        <tr>
          <td>
            Тип
          </td>
          <td>
            {data.type}
          </td>
        </tr>
        <tr>
          <td>
            Дата загрузки
          </td>
          <td>
            {formatDate(data.date)}
          </td>
        </tr>
        <tr>
          <td>
            Всего валидных идент.
          </td>
          <td>
            {formatNumber(data.validCount || 0)}
          </td>
        </tr>
        <tr>
          <td>
            E-mail
          </td>
          <td>
            {formatNumber(data.emailsCount || 0)}
          </td>
        </tr>
        <tr>
          <td>
            Телефонов
          </td>
          <td>
            {formatNumber(data.phonesCount || 0)}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

CommonInfo.propTypes = propTypes;
CommonInfo.defaultProps = defaultProps;

export default CommonInfo;
