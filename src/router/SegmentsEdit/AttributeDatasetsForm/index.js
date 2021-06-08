import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import Button from '@/components/Button';
import { formatNumber } from '@/utils/format';
import styles from './styles.module.scss';

const propTypes = {
  datasets: PropTypes.arrayOf(PropTypes.string),
  onClose: PropTypes.func,
};

const defaultProps = {
  datasets: [],
  onClose: () => {},
};

const AttributeDatasetsForm = function AttributeDatasetsForm({
  datasets,
  onClose,
}) {
  return (
    <Formik
      initialValues={{
        other: '',
        choose: '',
        allDatasetsSelected: false,
        datasetsSelected: [],
      }}
      validateOnBlur
      onSubmit={(values) => console.log(values)}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        dirty,
      }) => (
        <Form className={styles.attributeDatasetsForm}>
          <div className={styles.attributeDatasetsHeaderSelectors}>
            <label>
              <input
                name="datasets-radio"
                type="radio"
                value={values.other}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              Любой
            </label>
            <label>
              <input
                name="datasets-radio"
                type="radio"
                value={values.choose}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              Выбрать из списка
            </label>
          </div>
          <div className={styles.attributeDatasetsFormTableWrapper}>
            <table className={styles.attributeDatasetsFormTable}>
              <tbody>
                <tr className={styles.trHeader}>
                  <th className={styles.tdSelect}>
                    <input type="checkbox" />
                    Название
                  </th>
                  <th>
                    Дата загрузки
                  </th>
                  <th>
                    Телефонов
                  </th>
                  <th>
                    E-mail
                  </th>
                </tr>

                {(!datasets || !Array.isArray(datasets)) && (
                <tr>
                  <td colSpan="4">
                    Нет данных
                  </td>
                </tr>
                )}

                {datasets.map((d) => (
                  <tr key={d}>
                    <td className={styles.tdSelect}>
                      <input type="checkbox" />
                      {d}
                    </td>
                    <td>
                      -
                    </td>
                    <td>
                      {formatNumber(0)}
                    </td>
                    <td>
                      {formatNumber(0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.attributeDatasetsFormFooter}>
            <div className={styles.attributeDatasetsFormFooterCounter}>
              Выбрано:
              {' '}
              <b>
                0
              </b>
              {' '}
              из
              {' '}
              <b>
                0
              </b>
            </div>
            <div className={styles.attributeDatasetsFormFooterButtons}>
              <Button
                appearance="secondary"
                onClick={onClose}
              >
                отменить
              </Button>
              <Button
                disabled={!dirty}
                onClick={handleSubmit}
                type="submit"
              >
                выбрать
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

AttributeDatasetsForm.propTypes = propTypes;
AttributeDatasetsForm.defaultProps = defaultProps;

export default AttributeDatasetsForm;
