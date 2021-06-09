import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
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
  const formik = useFormik({
    initialValues: {
      picked: 'choose',
      allDatasetsSelected: false,
      datasetsSelected: [],
    },
    validateOnBlur: true,
    onSubmit: (values) => console.log(values),
  });

  const handleAllDatasetsSelectedChange = (e) => {
    const { checked } = e.target;
    if (checked) {
      formik.setFieldValue('datasetsSelected', datasets.map((dataset) => dataset));
      formik.setFieldValue('allDatasetsSelected', true);
      return;
    }
    formik.setFieldValue('datasetsSelected', []);
    formik.setFieldValue('allDatasetsSelected', false);
  };

  return (

    <form
      onSubmit={formik.handleSubmit}
      className={styles.attributeDatasetsForm}
    >
      <div className={styles.attributeDatasetsHeaderSelectors}>
        <label>
          <input
            name="picked"
            type="radio"
            value="any"
            checked={formik.values.picked === 'any'}
            onChange={formik.handleChange}
          />
          Любой
        </label>
        <label>
          <input
            name="picked"
            type="radio"
            value="choose"
            checked={formik.values.picked === 'choose'}
            onChange={formik.handleChange}
          />
          Выбрать из списка
        </label>
      </div>
      {formik.values.picked === 'choose'
        && (
          <div className={styles.attributeDatasetsFormTableWrapper}>
            <table className={styles.attributeDatasetsFormTable}>
              <tbody>
                <tr className={styles.trHeader}>
                  <th className={styles.tdSelect}>
                    <input
                      onChange={handleAllDatasetsSelectedChange}
                      name="allDatasetsSelected"
                      type="checkbox"
                      disabled={formik.values.picked === 'any'}
                      checked={formik.values.allDatasetsSelected
                       && formik.values.picked !== 'any'}
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

                {datasets.map((dataset) => (
                  <tr key={dataset}>
                    <td className={styles.tdSelect}>
                      <input
                        name="datasetsSelected"
                        value={dataset}
                        type="checkbox"
                        checked={formik.values.datasetsSelected
                          .includes(dataset)
                          && formik.values.picked !== 'any'}
                        disabled={formik.values.picked === 'any'}
                        onChange={formik.handleChange}
                      />
                      {dataset}
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
        )}

      <div className={styles.attributeDatasetsFormFooter}>
        {formik.values.picked === 'choose'
          && (
            <div className={styles.attributeDatasetsFormFooterCounter}>
              Выбрано:
              {' '}
              <b>
                {formik.values.datasetsSelected?.length}
              </b>
              {' '}
              из
              {' '}
              <b>
                {datasets.length}
              </b>
            </div>
          )}
        <div className={styles.attributeDatasetsFormFooterButtons}>
          <Button
            appearance="secondary"
            onClick={onClose}
          >
            отменить
          </Button>
          <Button
            disabled={!formik.dirty}
            type="submit"
          >
            выбрать
          </Button>
        </div>
      </div>

    </form>
  );
};

AttributeDatasetsForm.propTypes = propTypes;
AttributeDatasetsForm.defaultProps = defaultProps;

export default AttributeDatasetsForm;
