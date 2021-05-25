import React from 'react';
import PropTypes from 'prop-types';
import { formatDate, formatNumber } from '@/utils/format';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.strings),
};

const defaultProps = {
  data: [],
};

const UserAttributes = function UserAttributes({ data }) {
  return (
    <table className={styles.userAttributes}>
      <tbody>
        <tr>
          <th>
            Наименование
          </th>
          <th>
            Значение
          </th>
          <th>
            Дата
          </th>
        </tr>

        {data.map((row) => (
          <tr key={row.key}>
            <td>
              {row.name}
            </td>
            <td>
              {formatNumber(row.value)}
            </td>
            <td>
              {formatDate(row.date)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

UserAttributes.propTypes = propTypes;
UserAttributes.defaultProps = defaultProps;

export default UserAttributes;
