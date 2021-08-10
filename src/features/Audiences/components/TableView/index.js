import React, { Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { withFormikField } from '@/components/formik';
import { useQuery } from '@/hooks';
import { formatDate, formatNumber } from '@/utils/format';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Table, { TableCell, TableRow } from '@/components/Table';
import { entityTypes } from '@/features/Audiences/constants';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    loadedAt: PropTypes.string,
    local: PropTypes.bool,
    title: PropTypes.string,
    entityTypeTotals: PropTypes.arrayOf(PropTypes.shape({
      entityType: PropTypes.string,
      total: PropTypes.number,
    })),
  })),
  onFilter: PropTypes.func,
};

const defaultProps = {
  data: [],
  onFilter: () => {},
};

const TableView = function TableView({
  data,
  onFilter,
}) {
  const query = useQuery();

  const initialFormValues = {
    title: query.get('title') || '',
    isLocal: query.get('isLocal') || '',
  };

  const rows = useMemo(() => {
    const mapEntityTotals = (entities) => {
      if (!entities || !Array.isArray(entities)) {
        return ([]);
      }
      return entities.reduce((acc, { entityType, total }) => {
        const mapEntities = {
          [entityTypes.emails]: 'emals',
          [entityTypes.phones]: 'phones',
        };
        if (!entityType) {
          return acc;
        }
        return ({
          ...acc,
          [mapEntities[entityType] || entityType]: total,
        });
      }, {});
    };

    return data
      .map((item) => ({
        key: `${item.title}-${item.loadedAt}`,
        ...item,
        ...mapEntityTotals(item.entityTypeTotals),
      }));
  }, [data]);

  const handleSubmitForm = (values) => {
    onFilter({
      title: values.title || '',
      isLocal: ['true', 'false'].includes(values.isLocal)
        ? values.isLocal
        : '',
    });
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
          <Table
            className={styles.tableView}
            header={(
              <Fragment>
                <TableRow>
                  <TableCell
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
                  </TableCell>
                  <TableCell
                    colSpan="2"
                    data-purpose="filter"
                  >
                    <span className={styles.tableViewCell}>
                      <Field
                        name="isLocal"
                        placeholder="Тип"
                        resetText="Сбросить"
                        className={styles.tableViewInput}
                        value={values.isLocal}
                        options={[
                          { text: 'Глобальная', value: 'false' },
                          { text: 'Локальная', value: 'true' },
                        ]}
                        component={FormikSelect}
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
                  <TableCell>
                    Название
                  </TableCell>
                  <TableCell align="right">
                    Телефонов
                  </TableCell>
                  <TableCell align="right">
                    E-mail
                  </TableCell>
                  <TableCell>
                    Тип
                  </TableCell>
                  <TableCell align="right">
                    Дата загрузки
                  </TableCell>
                </TableRow>
              </Fragment>
            )}
          >
            {Array.isArray(data) && rows.map((row) => (
              <TableRow key={row.id || row.key}>
                <TableCell>
                  <Link
                    to={`/audiences/details/${row.id || ''}`}
                  >
                    {row.title}
                  </Link>
                </TableCell>
                <TableCell align="right">
                  {row.phones ? formatNumber(row.phones) : '-'}
                </TableCell>
                <TableCell align="right">
                  {row.emails ? formatNumber(row.emails) : '-'}
                </TableCell>
                <TableCell>
                  {row.local ? 'Локальная' : 'Глобальная'}
                </TableCell>
                <TableCell align="right">
                  {formatDate(row.loadedAt)}
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </Form>
      )}
    </Formik>
  );
};

TableView.propTypes = propTypes;
TableView.defaultProps = defaultProps;

export default TableView;
