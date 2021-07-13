import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
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
  properties: PropTypes.objectOf(PropTypes.string).isRequired,
  onChange: PropTypes.func,
};

const defaultProps = {
  children: null,
  data: {},
  onChange: () => {},
};

const AttributeNumber = function AttributeNumber({
  children,
  data,
  properties,
  onChange,
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

  const validate = (values) => {
    const errors = {};

    const { max, min } = values || {};

    if (Number(min) < minValue) {
      errors.min = `Минимальное значение ниже допустимого: ${formatNumber(minValue)}`;
    }
    if (Number(max) < minValue) {
      errors.max = `Максимальное значение ниже допустимого: ${formatNumber(minValue)}`;
    }
    if (Number(min) > maxValue) {
      errors.min = `Минимальное значение выше допустимого: ${formatNumber(maxValue)}`;
    }
    if (Number(max) > maxValue) {
      errors.max = `Максимальное значение выше допустимого: ${formatNumber(maxValue)}`;
    }

    return errors;
  };

  const handleSubmitForm = (values) => {
    const { max, min } = values || {};
    if (typeof max === 'undefined' || typeof min === 'undefined') {
      return;
    }
    onChange({
      [properties.values]: [min, max],
    });
  };

  return (
    <div className={styles.attributeNumber}>
      <div
        className={cx(
          styles.attributeNumberSection,
          styles.attributeNumberSection_form,
        )}
      >
        <Formik
          initialValues={initialFormValues}
          validate={validate}
          onSubmit={handleSubmitForm}
        >
          {({ errors, setFieldValue, submitForm, validateForm }) => {
            const errorMessages = Object.values(errors)
              .map((message) => message);
            const handleChangeInput = (e) => {
              const { name, value } = e?.target || {};
              if (!name) {
                return;
              }
              setFieldValue(name, value || '');
              validateForm().then(submitForm);
            };
            return (
              <Form>
                <div className={styles.attributeNumberRow}>
                  <Field
                    placeholder=""
                    type="number"
                    max={maxValue}
                    min={minValue}
                    name={fieldNames.min}
                    component={AttributeNumverInput}
                    onChange={handleChangeInput}
                  />
                  &nbsp;
                  -
                  &nbsp;
                  <Field
                    placeholder=""
                    type="number"
                    max={maxValue}
                    min={minValue}
                    name={fieldNames.max}
                    component={AttributeNumverInput}
                    onChange={handleChangeInput}
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
