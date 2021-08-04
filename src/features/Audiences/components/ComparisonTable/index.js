import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { withFormikField } from '@/components/formik';
import { useQuery } from '@/hooks';
import { formatNumber } from '@/utils/format';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Spinner from '@/components/Spinner';
import Table, { TableCell, TableRow } from '@/components/Table';
import {
  queryParams,
  mapQueryParams,
} from '@/features/Audiences/pages/Details/constants';
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

  const initialFormValues = {
    [mapQueryParams[queryParams.search]]: query.get(queryParams.search) || '',
  };

  const FormikInput = withFormikField(Input);

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={onFilter}
    >
      {() => (
        <Form>
          <Table
            className={styles.comparisonTable}
            header={(
              <Fragment>
                <TableRow>
                  <TableCell
                    colSpan="5"
                    data-purpose="filter"
                  >
                    <span className={styles.comparisonTableCell}>
                      <Field
                        name={mapQueryParams[queryParams.search]}
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
                  </TableCell>
                </TableRow>

                <TableRow type="header">
                  <TableCell>
                    Название параметра
                  </TableCell>
                  <TableCell align="right">
                    {name || ''}
                  </TableCell>
                  <TableCell align="right">
                    Глобальная аудитория
                  </TableCell>
                  <TableCell align="right">
                    Пересечение
                  </TableCell>
                  <TableCell align="right">
                    %
                  </TableCell>
                </TableRow>
              </Fragment>
            )}
          >
            {isFetching && (
              <TableRow>
                <TableCell colSpan="5">
                  <Spinner />
                </TableCell>
              </TableRow>
            )}

            {!isFetching && Array.isArray(data) && data.map((row) => (
              <TableRow
                key={row.key}
                data-total={String(row.isTotal || false)}
              >
                <TableCell>
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  {formatNumber(row.comparedCount)}
                </TableCell>
                <TableCell align="right">
                  {formatNumber(row.globalCount)}
                </TableCell>
                <TableCell align="right">
                  {formatNumber(row.crossingCount)}
                </TableCell>
                <TableCell align="right">
                  {row.crossingPercent}
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </Form>
      )}
    </Formik>
  );
};

ComparisonTable.propTypes = propTypes;
ComparisonTable.defaultProps = defaultProps;

export default ComparisonTable;
