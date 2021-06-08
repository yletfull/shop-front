import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import Button from '@/components/Button';
import { formatNumber } from '@/utils/format';
import styles from './styles.module.scss';
// import DatasetCheckbox from './components/datasetCheckbox';

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
        picked: '',
        allDatasetsSelected: false,
        datasetsSelected: [],
      }}
      validateOnBlur
      onSubmit={(values) => console.log(values)}
    >
      {({
        handleSubmit,
        values,
        dirty,
      }) => (
        <Form
          onSubmit={handleSubmit}
          className={styles.attributeDatasetsForm}
        >
          <div className={styles.attributeDatasetsHeaderSelectors}>
            <label>
              <Field
                name="picked"
                type="radio"
                value="any"
              />
              Любой
            </label>
            <label>
              <Field
                name="picked"
                type="radio"
                value="choose"
              />
              Выбрать из списка
            </label>
          </div>
          <div className={styles.attributeDatasetsFormTableWrapper}>
            <table className={styles.attributeDatasetsFormTable}>
              <tbody>
                <tr className={styles.trHeader}>
                  <th className={styles.tdSelect}>
                    <Field
                      name="allDatasetsSelected"
                      type="checkbox"
                      disabled={values.picked === 'any'}
                    />
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
                      <Field
                        name="datasetsSelected"
                        value={d}
                        type="checkbox"
                        disabled={values.picked === 'any'}
                      />
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
                {datasets.length}
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
