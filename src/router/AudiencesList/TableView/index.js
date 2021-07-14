import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { withFormikField } from '@/components/formik';
import { useQuery } from '@/hooks';
import { formatDate, formatNumber } from '@/utils/format';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Spinner from '@/components/Spinner';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    loadedAt: PropTypes.string,
    local: PropTypes.bool,
    title: PropTypes.string,
    emails: PropTypes.number,
    phones: PropTypes.number,
  })),
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
  const query = useQuery();

  const queryParams = {
    searchName: 'name',
    searchType: 'type',
  };

  const initialFormValues = {
    name: query.get(queryParams.searchName) || '',
    type: query.get(queryParams.searchType) || '',
  };

  const handleSubmitForm = (values) => {
    console.log(values);
    if (0) {
      onFilter(values);
    }
  };

  const FormikInput = withFormikField(Input);
  const FormikSelect = withFormikField(Select);

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={handleSubmitForm}
    >
      {({ values }) => (
        <Form>
          <table className={styles.tableView}>
            <tbody>
              <tr>
                <td
                  colSpan="3"
                  data-purpose="filter"
                >
                  <Field
                    name="title"
                    placeholder="Название"
                    className={styles.tableViewInput}
                    component={FormikInput}
                    fullwidth
                  />
                </td>
                <td
                  colSpan="2"
                  data-purpose="filter"
                >
                  <span className={styles.tableViewCell}>
                    <Field
                      name="type"
                      placeholder="Тип"
                      resetText="Сбросить"
                      className={styles.tableViewInput}
                      value={values.type}
                      options={[
                        { text: 'Глобальная', value: 0 },
                        { text: 'Локальная', value: 1 },
                      ]}
                      component={FormikSelect}
                    />
                    <Button type="submit">
                      Найти
                    </Button>
                  </span>
                </td>
              </tr>
              <tr>
                <th>
                  Название
                </th>
                <th>
                  Телефонов
                </th>
                <th>
                  E-mail
                </th>
                <th>
                  Тип
                </th>
                <th>
                  Дата загрузки
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
                <tr key={row.id || row.key}>
                  <td>
                    <Link
                      to={`/audiences/details/${row.id || ''}`}
                    >
                      {row.title}
                    </Link>
                  </td>
                  <td>
                    {row.emails ? formatNumber(row.emails) : '-'}
                  </td>
                  <td>
                    {row.phones ? formatNumber(row.phones) : '-'}
                  </td>
                  <td>
                    {row.local ? 'Локальная' : 'Глобальная'}
                  </td>
                  <td>
                    {formatDate(row.loadedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Form>
      )}
    </Formik>
  );
};

TableView.propTypes = propTypes;
TableView.defaultProps = defaultProps;

export default TableView;
