import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@/hooks';
import { formatNumber } from '@/utils/format';
import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  onFilter: PropTypes.func,
};

const defaultProps = {
  data: [],
  onFilter: () => {},
};

const TableView = function TableView({ data, onFilter }) {
  const queryParams = {
    searchId: 'id',
    searchName: 'name',
  };

  const history = useHistory();
  const query = useQuery();

  const [
    searchId,
    setSearchId,
  ] = useState(query.get(queryParams.searchId) || '');
  const [
    searchName,
    setSearchName,
  ] = useState(query.get(queryParams.searchName) || '');

  const handleChangeSearchId = (e) => {
    const { value } = e?.target || {};
    if (typeof value === 'undefined') {
      return;
    }
    setSearchId(value);
  };
  const handleChangeSearchName = (e) => {
    const { value } = e?.target || {};
    if (typeof value === 'undefined') {
      return;
    }
    setSearchName(value);
  };
  const handleClickSearchButton = () => {
    query.set(queryParams.searchId, searchId);
    query.set(queryParams.searchName, searchName);
    history.push({ search: query.toString() });
    onFilter();
  };

  return (
    <table className={styles.tableView}>
      <tbody>
        <tr>
          <td data-purpose="filter">
            <span className={styles.tableViewCell}>
              <Input
                className={styles.tableViewInput}
                placeholder="ID"
                type="text"
                value={searchId}
                fullwidth
                onChange={handleChangeSearchId}
              />
            </span>
          </td>
          <td
            colSpan="8"
            data-purpose="filter"
          >
            <span className={styles.tableViewCell}>
              <Input
                className={cx(
                  styles.tableViewInput,
                  styles.tableViewInput_grow
                )}
                placeholder="Название"
                type="text"
                value={searchName}
                onChange={handleChangeSearchName}
              />
              <Button
                type="button"
                onClick={handleClickSearchButton}
              >
                Найти
              </Button>
            </span>
          </td>
        </tr>

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
