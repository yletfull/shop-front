import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { withFormikField } from '@/components/formik';
import { useQuery } from '@/hooks';
import { formatNumber } from '@/utils/format';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Spinner from '@/components/Spinner';
import styles from './styles.module.scss';

const propTypes = {
  isFetching: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    isTotal: PropTypes.bool,
    comparedCount: PropTypes.number,
    globalCount: PropTypes.number,
    crossingCount: PropTypes.number,
    crossingPercent: PropTypes.number,
  })),
  name: PropTypes.string,
  onFilter: PropTypes.func,
};

const defaultProps = {
  isFetching: false,
  data: [],
  name: '',
  onFilter: () => {},
};

const ComparisonTable = function ComparisonTable({
  isFetching,
  data,
  name,
  onFilter,
}) {
  const query = useQuery();

  const queryParams = {
    searchName: 'name',
  };

  const initialFormValues = {
    name: query.get(queryParams.searchName) || '',
  };

  const handleSubmitForm = (values) => {
    console.log(values);
    if (0) {
      onFilter();
    }
  };

  const FormikInput = withFormikField(Input);

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={handleSubmitForm}
    >
      {() => (
        <Form>
          <table className={styles.comparisonTable}>
            <tbody>
              <tr>
                <td
                  colSpan="5"
                  data-purpose="filter"
                >
                  <span className={styles.comparisonTableCell}>
                    <Field
                      name="name"
                      className={styles.comparisonTableInput}
                      component={FormikInput}
                      fullwidth
                    />
                    <Button
                      type="submit"
                      className={styles.comparisonTableButton}
                    >
                      Найти
                    </Button>
                  </span>
                </td>
              </tr>

              <tr>
                <th>
                  Название параметра
                </th>
                <th>
                  {name || ''}
                </th>
                <th>
                  Глобальная аудитория
                </th>
                <th>
                  Пересечение
                </th>
                <th>
                  %
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
                <tr
                  key={row.key}
                  data-total={String(row.isTotal || false)}
                >
                  <td>
                    {row.name}
                  </td>
                  <td>
                    {formatNumber(row.comparedCount)}
                  </td>
                  <td>
                    {formatNumber(row.globalCount)}
                  </td>
                  <td>
                    {formatNumber(row.crossingCount)}
                  </td>
                  <td>
                    {row.crossingPercent}
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

ComparisonTable.propTypes = propTypes;
ComparisonTable.defaultProps = defaultProps;

export default ComparisonTable;
