import React, { Children, cloneElement, useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import Radio from '@/components/Radio';
import { withFormikField } from '@/components/formik';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  datasets: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    name: PropTypes.string,
  })),
  selected: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  onClose: PropTypes.func,
};

const defaultProps = {
  children: null,
  datasets: [],
  selected: [],
  onClose: () => {},
};

const AttributeDatasetsSelect = function AttributeDatasetsSelect({
  children,
  datasets,
  selected,
  onClose,
}) {
  const radioValues = { any: 'any', list: 'list' };

  const isAny = selected.length === datasets.length;
  const initialFormValues = {
    list: isAny ? radioValues.any : radioValues.list,
  };

  const [isShowDatasetsList, setIsShowDatasetsList] = useState(!isAny);

  const handleSubmitForm = (values) => {
    const { list } = values || {};
    setIsShowDatasetsList(list === radioValues.list);
  };

  return (
    <div className={styles.attributeDatasetsSelect}>
      <div className={styles.attributeDatasetsSelectSection}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={handleSubmitForm}
        >
          {({ handleChange, submitForm, values }) => {
            const { list } = values || {};

            const handleChangeRadio = (e) => {
              handleChange(e);
              submitForm();
            };
            return (
              <Form>
                <label className={styles.attributeDatasetsSelectLabel}>
                  <Field
                    name="list"
                    value={radioValues.any}
                    checked={list === radioValues.any}
                    component={withFormikField(Radio)}
                    onChange={handleChangeRadio}
                  />
                  Любой
                </label>
                <label className={styles.attributeDatasetsSelectLabel}>
                  <Field
                    name="list"
                    value={radioValues.list}
                    checked={list === radioValues.list}
                    component={withFormikField(Radio)}
                    onChange={handleChangeRadio}
                  />
                  Выбрать из списка
                </label>
              </Form>
            );
          }}
        </Formik>
      </div>

      {isShowDatasetsList && (
        <div className={styles.attributeDatasetsSelectSection}>
          {Children.map(children, (child) => cloneElement(child, { onClose }))}
        </div>
      )}
    </div>
  );
};

AttributeDatasetsSelect.propTypes = propTypes;
AttributeDatasetsSelect.defaultProps = defaultProps;

export default AttributeDatasetsSelect;
