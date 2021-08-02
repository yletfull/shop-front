import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { useQuery } from '@/hooks';
import { formatDate, formatNumber } from '@/utils/format';
import { withFormikField } from '@/components/formik';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Table, { TableRow, TableCell } from '@/components/Table';
import ExportFiles from '@/features/Segments/components/ExportFiles';
import {
  queryParams,
  mapSegmentEntityTypes,
} from '@/features/Segments/constants';
import styles from './styles.module.scss';

const propTypes = {
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
  onSubmitFilter: PropTypes.func,
};

const defaultProps = {
  data: [],
  onSubmitFilter: () => {},
};

const TableView = function TableView({
  data,
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
            <Table className={styles.tableView}>
              <TableRow>
                <TableCell
                  data-purpose="filter"
                  width="50"
                >
                  <Field
                    name="id"
                    placeholder="ID"
                    component={FormikInput}
                    fullwidth
                  />
                </TableCell>
                <TableCell
                  colSpan="4"
                  data-purpose="filter"
                >
                  <Field
                    name="name"
                    placeholder="Название"
                    component={FormikInput}
                    fullwidth
                  />
                </TableCell>
                <TableCell data-purpose="filter">
                  <Field
                    name="newEntities"
                    placeholder="Доступны новые идентиф."
                    resetText="Сбросить"
                    value={newEntities}
                    options={[
                      { text: 'Да', value: 1 },
                      { text: 'Нет', value: 0 },
                    ]}
                    component={FormikSelect}
                    fullwidth
                  />
                </TableCell>
                <TableCell
                  colSpan="2"
                  data-purpose="filter"
                >
                  <span className={styles.tableViewCell}>
                    <Field
                      name="version"
                      placeholder="Версий"
                      component={FormikInput}
                      fullwidth
                    />
                    <Button
                      type="submit"
                      className={styles.tableViewButton}
                    >
                      Найти
                    </Button>
                  </span>
                </TableCell>
              </TableRow>

              <TableRow type="header">
                <TableCell data-purpose="header">
                  ID
                </TableCell>
                <TableCell data-purpose="header">
                  Название
                </TableCell>
                <TableCell data-purpose="header">
                  E-mail
                </TableCell>
                <TableCell data-purpose="header">
                  Телефонов
                </TableCell>
                <TableCell data-purpose="header">
                  Файлы
                </TableCell>
                <TableCell data-purpose="header">
                  Доступны новые идентиф.
                </TableCell>
                <TableCell data-purpose="header">
                  Версий
                </TableCell>
                <TableCell data-purpose="header">
                  Посл. версия
                </TableCell>
              </TableRow>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    {row.id}
                  </TableCell>
                  <TableCell>
                    <Link
                      title={row.title}
                      to={`/segments/edit/${row.id}`}
                    >
                      {row.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {row.totalEmailsCount ? formatNumber(row.totalEmailsCount) : '-'}
                  </TableCell>
                  <TableCell>
                    {row.totalPhonesCount ? formatNumber(row.totalPhonesCount) : '-'}
                  </TableCell>
                  <TableCell>
                    <ExportFiles
                      hideIcons
                      defaultFileName={row.title}
                      segmentId={row.id}
                      statistics={row?.entityTypesTotal || []}
                    />
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    {formatNumber(row.versionCount)}
                  </TableCell>
                  <TableCell align="right">
                    {formatDate(row.lastVersionDate)}
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </Form>
        );
      }}
    </Formik>
  );
};

TableView.propTypes = propTypes;
TableView.defaultProps = defaultProps;

export default TableView;
