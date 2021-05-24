import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  data: [],
};

const UserSegments = function UserSegments({ data }) {
  return (
    <table className={styles.userSegments}>
      <tbody>
        <tr>
          <th>
            ID
          </th>
          <th>
            Название
          </th>
          <th>
            E-mail
          </th>
          <th>
            Телефонов
          </th>
          <th>
            Скачать файлы для площадок
          </th>
          <th>
            Версия от
          </th>
        </tr>

        {data.map((row) => (
          <tr key={row.id}>
            <td>
              {row.id}
            </td>
            <td>
              {row.name}
            </td>
            <td>
              {row.email}
            </td>
            <td>
              {row.phone}
            </td>
            <td>
              {row.files}
            </td>
            <td>
              {row.version}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

UserSegments.propTypes = propTypes;
UserSegments.defaultProps = defaultProps;

export default UserSegments;
