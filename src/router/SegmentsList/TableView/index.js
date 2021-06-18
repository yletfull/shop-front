import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { useQuery } from '@/hooks';
import { formatNumber } from '@/utils/format';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Spinner from '@/components/Spinner';
import styles from './styles.module.scss';

const propTypes = {
  queryParams: PropTypes.shape({
    searchId: PropTypes.string,
    searchName: PropTypes.string,
  }).isRequired,
  data: PropTypes.arrayOf(PropTypes.string),
  isFetching: PropTypes.bool,
  onClickDownload: PropTypes.func,
  onSubmitFilter: PropTypes.func,
};

const defaultProps = {
  data: [],
  isFetching: false,
  onClickDownload: () => {},
  onSubmitFilter: () => {},
};

const TableView = function TableView({
  queryParams,
  data,
  isFetching,
  onClickDownload,
  onSubmitFilter,
}) {
  const query = useQuery();

  const [
    searchId,
    setSearchId,
  ] = useState(query.get(queryParams?.searchId) || '');
  const [
    searchName,
    setSearchName,
  ] = useState(query.get(queryParams?.searchName) || '');

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
  const handleClickDownloadButton = (e) => {
    const { id, title, type } = e?.target?.dataset || {};
    if (!id || !type) {
      return;
    }
    onClickDownload({ id, title, type });
  };
  const handleClickSearchButton = () => {
    onSubmitFilter({ searchId, searchName });
  };

  return (
    <table className={styles.tableView}>
      <tbody>
        <tr>
          <td data-purpose="filter">
            <span className={styles.tableViewCell}>
              <Input
                className={cx(
                  styles.tableViewInput,
                  styles.tableViewInput_min,
                )}
                placeholder="ID"
                type="text"
                value={searchId}
                fullwidth
                onChange={handleChangeSearchId}
              />
            </span>
          </td>
          <td
            colSpan="7"
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
            Файлы
          </th>
          <th>
            Доступны новые идентиф.
          </th>
          <th>
            Версий
          </th>
          <th>
            Посл. версия
          </th>
        </tr>

        {isFetching && (
          <tr>
            <td colSpan="8">
              <Spinner />
            </td>
          </tr>
        )}

        {data.map((row) => (
          <tr key={row.id}>
            <td>
              {row.id}
            </td>
            <td>
              <Link
                title={row.title}
                to={`/segments/edit/${row.id}`}
              >
                {row.title}
              </Link>
            </td>
            <td>
              {row.emailsCount ? formatNumber(row.emailsCount) : '-'}
            </td>
            <td>
              {row.phonesCount ? formatNumber(row.phonesCount) : '-'}
            </td>
            <td>
              <Button
                appearance="control"
                data-id={row.id}
                data-title={row.title}
                data-type="vk"
                onClick={handleClickDownloadButton}
              >
                <span className={styles.tableViewDownloadLabel}>
                  VK
                </span>
              </Button>
              &nbsp;
              &nbsp;
              &nbsp;
              <Button
                appearance="control"
                data-id={row.id}
                data-title={row.title}
                data-type="fb"
                onClick={handleClickDownloadButton}
              >
                <span className={styles.tableViewDownloadLabel}>
                  FB
                </span>
              </Button>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TableView.propTypes = propTypes;
TableView.defaultProps = defaultProps;

export default TableView;
