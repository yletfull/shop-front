import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@/hooks';
import { formatDate, formatNumber } from '@/utils/format';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Spinner from '@/components/Spinner';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  isFetching: PropTypes.bool,
  onFilter: PropTypes.func,
};

const defaultProps = {
  data: [],
  isFetching: false,
  onFilter: () => {},
};

const TableView = function TableView({
  data,
  isFetching,
  onFilter,
}) {
  const queryParams = {
    searchDate: 'date',
    searchName: 'name',
    searchType: 'type',
  };

  const history = useHistory();
  const query = useQuery();

  const [
    searchDate,
    setSearchDate,
  ] = useState(query.get(queryParams.searchDate) || '');
  const [
    searchName,
    setSearchName,
  ] = useState(query.get(queryParams.searchName) || '');
  const [
    searchType,
    setSearchType,
  ] = useState(query.get(queryParams.searchType) || '');

  const handleChangeSearchDate = (e) => {
    const { value } = e?.target || {};
    if (typeof value === 'undefined') {
      return;
    }
    setSearchDate(value);
  };
  const handleChangeSearchName = (e) => {
    const { value } = e?.target || {};
    if (typeof value === 'undefined') {
      return;
    }
    setSearchName(value);
  };
  const handleChangeSearchType = (e) => {
    const { value } = e?.target || {};
    if (typeof value === 'undefined') {
      return;
    }
    setSearchType(value);
  };
  const handleClickSearchButton = () => {
    query.set(queryParams.searchDate, searchDate);
    query.set(queryParams.searchName, searchName);
    query.set(queryParams.searchType, searchType);
    history.push({ search: query.toString() });
    onFilter();
  };

  return (
    <table className={styles.tableView}>
      <tbody>
        <tr>
          <td data-purpose="filter">
            <Input
              className={cx(
                styles.tableViewInput,
                styles.tableViewInput_grow
              )}
              placeholder="Дата загрузки"
              type="text"
              value={searchDate}
              onChange={handleChangeSearchDate}
            />
          </td>
          <td data-purpose="filter">
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
          </td>
          <td
            colSpan="3"
            data-purpose="filter"
          >
            <span className={styles.tableViewCell}>
              <Input
                className={cx(
                  styles.tableViewInput,
                  styles.tableViewInput_grow
                )}
                placeholder="Тип"
                type="text"
                value={searchType}
                onChange={handleChangeSearchType}
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
            Дата загрузки
          </th>
          <th>
            Название
          </th>
          <th>
            Тип
          </th>
          <th>
            E-mail
          </th>
          <th>
            Телефонов
          </th>
        </tr>

        {isFetching && (
          <tr>
            <td colSpan="5">
              <Spinner />
            </td>
          </tr>
        )}

        {!isFetching && Array.isArray(data) && data.map((row) => (
          <tr key={row.key}>
            <td>
              {formatDate(row.date)}
            </td>
            <td>
              {row.name}
            </td>
            <td>
              {row.type}
            </td>
            <td>
              {formatNumber(row.emailsCount)}
            </td>
            <td>
              {formatNumber(row.phonesCount)}
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
