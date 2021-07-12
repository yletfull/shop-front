import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Formik, Form, Field } from 'formik';
import { withFormikField } from '@/components/formik';
import Input from '@/components/Input';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  data: PropTypes.shape({
    maxValue: PropTypes.string,
    minValue: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.string),
  }),
  properties: PropTypes.objectOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func,
};
const defaultProps = {
  children: null,
  data: {},
  onSubmit: () => {},
};

const AttributeDate = function AttributeDate({
  children,
  data,
  properties,
  onSubmit,
}) {
  const fieldNames = {
    maxDate: 'maxDate',
    minDate: 'minDate',
  };

  const { maxValue, minValue, values: initialValues } = data || {};
  const [minDate, maxDate] = initialValues || [];

  const initialFormValues = {
    [fieldNames.maxDate]: maxDate || maxValue || '',
    [fieldNames.minDate]: minDate || minValue || '',
  };

  const handleSubmitForm = (values) => {
    const { maxDate: selectedMaxDate, minDate: selectedMinDate } = values || {};
    if (!selectedMaxDate && !selectedMinDate) {
      return;
    }
    onSubmit({
      [properties.values]: [
        selectedMinDate || '',
        selectedMaxDate || '',
      ],
    });
  };

  const FormikInput = withFormikField(Input);

  return (
    <div className={styles.attributeDate}>
      <div
        className={cx(
          styles.attributeDateSection,
          styles.attributeDateSection_form,
        )}
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={handleSubmitForm}
        >
          {({ setFieldValue, submitForm }) => {
            const handleChangeInput = (e) => {
              const { name, value } = e?.target || {};
              if (!name || !value) {
                return;
              }
              setFieldValue(name, value);
              submitForm();
            };
            return (
              <Form>
                <div className={styles.attributeDateRow}>
                  <Field
                    placeholder="Выберите дату"
                    type="date"
                    name={fieldNames.minDate}
                    max={maxValue}
                    min={minValue}
                    className={styles.attributeDateInput}
                    component={FormikInput}
                    onChange={handleChangeInput}
                  />
                  &nbsp;
                  -
                  &nbsp;
                  <Field
                    placeholder="Выберите дату"
                    type="date"
                    name={fieldNames.maxDate}
                    max={maxValue}
                    min={minValue}
                    className={styles.attributeDateInput}
                    component={FormikInput}
                    onChange={handleChangeInput}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>

      <div className={styles.attributeDateSection}>
        {children}
      </div>
    </div>
  );
};

AttributeDate.propTypes = propTypes;
AttributeDate.defaultProps = defaultProps;

export default AttributeDate;
