import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { withFormikField } from '@/components/formik';
import { formatNumber } from '@/utils/format';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import styles from './styles.module.scss';

const propTypes = {
  attributeIndex: PropTypes.number.isRequired,
  groupIndex: PropTypes.number.isRequired,
  datasets: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    name: PropTypes.string,
  })),
  selected: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ])),
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

const defaultProps = {
  datasets: [],
  selected: [],
  onClose: () => {},
  onSubmit: () => {},
};

const AttributeDatasetsForm = function AttributeDatasetsForm({
  attributeIndex,
  groupIndex,
  datasets,
  selected,
  onClose,
  onSubmit,
}) {
  const datasetIds = datasets
    .map(({ id }) => String(id));

  const initialFormValues = {
    list: selected || [],
  };

  const handleCloseForm = () => {
    onClose();
  };
  const handleSubmitForm = (values) => {
    const { list } = values || {};
    if (!list || !Array.isArray(list)) {
      return;
    }
    onSubmit([groupIndex, attributeIndex], { datasetIds: list });
    onClose();
  };

  const FormikCheckbox = withFormikField(Checkbox);

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={handleSubmitForm}
    >
      {({ setFieldValue, values }) => {
        const { list } = values || {};

        const isSelectedAllDatasets = datasetIds.length === list.length;

        const getCheckedStatus = (value) => {
          if (!list || !Array.isArray(list)) {
            return false;
          }
          return list.includes(String(value));
        };
        const handleChangeSelectAll = (e) => {
          const { checked } = e?.target || {};
          setFieldValue('list', checked ? datasetIds : []);
        };

        return (
          <Form>
            <table className={styles.attributeDatasetsFormTable}>
              <tbody>
                <tr className={styles.trHeader}>
                  <th className={styles.tdSelect}>
                    <label>
                      <Checkbox
                        checked={isSelectedAllDatasets}
                        onChange={handleChangeSelectAll}
                      />
                      Название
                    </label>
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
                  <tr key={dataset.id}>
                    <td className={styles.tdSelect}>
                      <label>
                        <Field
                          name="list"
                          checked={getCheckedStatus(dataset.id)}
                          value={String(dataset.id)}
                          component={FormikCheckbox}
                        />
                        {dataset.name}
                      </label>
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

            <div className={styles.attributeDatasetsFormFooter}>
              <div className={styles.attributeDatasetsFormFooterCounter}>
                Выбрано:
                {' '}
                <b>
                  {values?.list?.length}
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
                  onClick={handleCloseForm}
                >
                  отменить
                </Button>
                <Button
                  type="submit"
                >
                  выбрать
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

AttributeDatasetsForm.propTypes = propTypes;
AttributeDatasetsForm.defaultProps = defaultProps;

export default AttributeDatasetsForm;
