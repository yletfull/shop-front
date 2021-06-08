import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { formatNumber } from '@/utils/format';
import AttributeNumverInput from './AttributeNumberInput';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  data: PropTypes.shape({
    maxValue: PropTypes.string,
    minValue: PropTypes.string,
  }),
};

const defaultProps = {
  children: null,
  data: {},
};

const AttributeNumber = function AttributeNumber({
  children,
  data,
}) {
  const { maxValue, minValue } = data || {};

  const fieldNames = {
    min: 'min',
    max: 'max',
  };

  const initialFormValues = {
    min: minValue,
    max: maxValue,
  };

  const handleSubmitForm = (values, { setSubmitting }) => {
    console.log('Submit:', values);
    setSubmitting(false);
  };
  const validateFormValues = (values) => {
    const { [fieldNames.min]: min, [fieldNames.max]: max } = values;
    const errors = {};
    if (Number(min) < minValue) {
      errors.min = `Минимальное значение ниже допустимого: ${formatNumber(minValue)}`;
    }
    if (Number(max) > maxValue) {
      errors.max = `Максимальное значение выше допустимого: ${formatNumber(maxValue)}`;
    }
    return errors;
  };

  return (
    <div className={styles.attributeNumber}>
      <div className={styles.attributeNumberSection}>
        <Formik
          initialValues={initialFormValues}
          validate={validateFormValues}
          onSubmit={handleSubmitForm}
        >
          {({ errors, submitForm }) => {
            const errorMessages = Object.values(errors)
              .map((message) => message);
            const handleBlurInput = () => {
              submitForm();
            };
            return (
              <Form>
                <div className={styles.attributeNumberRow}>
                  <Field
                    placeholder=""
                    name={fieldNames.min}
                    component={AttributeNumverInput}
                    onBlur={handleBlurInput}
                  />
                  &nbsp;
                  -
                  &nbsp;
                  <Field
                    placeholder=""
                    name={fieldNames.max}
                    component={AttributeNumverInput}
                    onBlur={handleBlurInput}
                  />
                </div>

                <div className={styles.attributeNumberRow}>
                  {errorMessages.map((message) => (
                    <span
                      key={message}
                      className={styles.attributeNumberMessage}
                    >
                      {message}
                    </span>
                  ))}
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className={styles.attributeNumberSection}>
        {children}
      </div>
    </div>
  );
};

AttributeNumber.propTypes = propTypes;
AttributeNumber.defaultProps = defaultProps;

export default AttributeNumber;
