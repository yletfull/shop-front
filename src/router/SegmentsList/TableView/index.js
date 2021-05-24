import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from '@/utils/format';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  data: [],
};

const TableView = functio TableView({ data }) {
  return (
    <table className={styles.table}>
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
            Версий
          </th>
          <th>
            Последняя версия от
          </th>
          <th>
            Доступны новые идентификаторы
          </th>
          <th aria-label="Пересчитать" />
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
              {formatNumber(row.emailsCount)}
            </td>
            <td>
              {formatNumber(row.phonesCount)}
            </td>
            <td>
              {row.download}
            </td>
            <td>
              {row.version}
            </td>
            <td>
              {row.versionDate}
            </td>
            <td>
              {row.newIdentificators}
            </td>
            <td>
              Пересчитать
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TableView.propTypes = propTypes;
TableView.defaultProps = defaultProps;

export default TableView;
