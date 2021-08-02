import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { useQuery } from '@/hooks';
import { formatDate, formatNumber } from '@/utils/format';
import { withFormikField } from '@/components/formik';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Spinner from '@/components/Spinner';
import ExportFiles from '@/features/Segments/components/ExportFiles';
import { mapSegmentEntityTypes } from '@/features/Segments/constants';
import styles from './styles.module.scss';

const propTypes = {
  queryParams: PropTypes.shape({
    searchId: PropTypes.string,
    searchName: PropTypes.string,
    searchNewEntities: PropTypes.string,
    searchVersion: PropTypes.string,
  }).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    totalEmailsCount: PropTypes.number,
    totalPhonesCount: PropTypes.number,
    newEntityTypeTotals: PropTypes.arrayOf(PropTypes.shape({
      entityType: PropTypes.string,
      total: PropTypes.number,
    })),
    versionCount: PropTypes.number,
    lastVersionDate: PropTypes.string,
  })),
  isFetching: PropTypes.bool,
  onSubmitFilter: PropTypes.func,
};

const defaultProps = {
  data: [],
  isFetching: false,
  onSubmitFilter: () => {},
};

const TableView = function TableView({
  queryParams,
  data,
  isFetching,
  onSubmitFilter,
}) {
  const query = useQuery();

  const initialFormValues = {
    id: query.get(queryParams?.searchId) || '',
    name: query.get(queryParams?.searchName) || '',
    newEntities: query.get(queryParams?.searchNewEntities) || '',
    version: query.get(queryParams?.searchVersion) || '',
  };

  const handleSubmitForm = (values) => {
    const {
      id: searchId,
      name: searchName,
      newEntities: searchNewEntities,
      version: searchVersion,
    } = values || {};
    onSubmitFilter({
      searchId,
      searchName,
      searchNewEntities,
      searchVersion,
    });
  };

  const FormikInput = withFormikField(Input);
  const FormikSelect = withFormikField(Select);

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={handleSubmitForm}
    >
      {({ values }) => {
        const { newEntities } = values || {};
        return (
          <Form>
            <table className={styles.tableView}>
              <tbody>
                <tr>
                  <td data-purpose="filter">
                    <span className={styles.tableViewCell}>
                      <Field
                        name="id"
                        placeholder="ID"
                        className={cx(
                          styles.tableViewInput,
                          styles.tableViewInput_min,
                        )}
                        component={FormikInput}
                        fullwidth
                      />
                    </span>
                  </td>
                  <td
                    colSpan="4"
                    data-purpose="filter"
                  >
                    <span className={styles.tableViewCell}>
                      <Field
                        name="name"
                        placeholder="Название"
                        className={styles.tableViewInput}
                        component={FormikInput}
                        fullwidth
                      />
                    </span>
                  </td>
                  <td data-purpose="filter">
                    <span className={styles.tableViewCell}>
                      <Field
                        name="newEntities"
                        placeholder="Доступны новые идентиф."
                        resetText="Сбросить"
                        value={newEntities}
                        options={[
                          { text: 'Да', value: 1 },
                          { text: 'Нет', value: 0 },
                        ]}
                        className={styles.tableViewInput}
                        component={FormikSelect}
                        fullwidth
                      />
                    </span>
                  </td>
                  <td
                    colSpan="2"
                    data-purpose="filter"
                  >
                    <span className={styles.tableViewCell}>
                      <Field
                        name="version"
                        placeholder="Версий"
                        className={cx(
                          styles.tableViewInput,
                          styles.tableViewInput_grow
                        )}
                        component={FormikInput}
                      />
                      <Button type="submit">
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
                      <Spinner layout="block" />
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
                      {row.totalEmailsCount ? formatNumber(row.totalEmailsCount) : '-'}
                    </td>
                    <td>
                      {row.totalPhonesCount ? formatNumber(row.totalPhonesCount) : '-'}
                    </td>
                    <td>
                      <ExportFiles
                        hideIcons
                        defaultFileName={row.title}
                        segmentId={row.id}
                        statistics={row?.entityTypesTotal || []}
                      />
                    </td>
                    <td>
                      {row.newEntityTypeTotals
                        && Array.isArray(row.newEntityTypeTotals)
                        && row.newEntityTypeTotals
                          .map(({ entityType, total }) => (
                            <span
                              key={entityType}
                              className={styles.tableViewEntities}
                            >
                              <span className={styles.tableViewEntitiesLabel}>
                                {`${mapSegmentEntityTypes[entityType] || entityType}: `}
                              </span>
                              {total > 0 ? '+' : ''}
                              {formatNumber(total)}
                            </span>
                          ))}
                    </td>
                    <td>
                      {formatNumber(row.versionCount)}
                    </td>
                    <td align="right">
                      {formatDate(row.lastVersionDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Form>
        );
      }}
    </Formik>
  );
};

TableView.propTypes = propTypes;
TableView.defaultProps = defaultProps;

export default TableView;
