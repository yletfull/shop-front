import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import cx from 'classnames';
import AttributeEnumCheckbox from './AttributeEnumCheckbox';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  data: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.string),
    values: PropTypes.arrayOf(PropTypes.string),
  }),
  equalityTypes: PropTypes.objectOf(PropTypes.string).isRequired,
  properties: PropTypes.objectOf(PropTypes.string).isRequired,
  onChange: PropTypes.func,
};

const defaultProps = {
  children: null,
  data: {},
  onChange: () => {},
};

const AttributeEnum = function AttributeEnum({
  children,
  data,
  equalityTypes,
  properties,
  onChange,
}) {
  const { options = [], values = [] } = data || {};

  const isVisibleOptions = options && Array.isArray(options);

  const initialFormValues = {
    [properties.values]: values,
  };

  const handleSubmitForm = ({ values: formValues }, { setSubmitting }) => {
    setSubmitting(false);
    if (!formValues || !Array.isArray(formValues)) {
      return;
    }
    const equality = formValues.length > 0
      ? equalityTypes.equal
      : equalityTypes.any;
    onChange({
      [properties.equality]: equality,
      [properties.values]: formValues,
    });
  };

  return (
    <div className={styles.attributeEnum}>
      <div
        className={cx(
          styles.attributeEnumSection,
          styles.attributeEnumSection_form,
        )}
      >
        {isVisibleOptions && (
          <Formik
            initialValues={initialFormValues}
            onSubmit={handleSubmitForm}
          >
            {({ submitForm }) => {
              const handleChangeCheckbox = () => {
                submitForm();
              };
              return (
                <Form>
                  {options.map((value) => (
                    <label
                      key={value}
                      className={styles.attributeEnumOption}
                    >
                      <Field
                        key={value}
                        type="checkbox"
                        name={properties.values}
                        value={value}
                        component={AttributeEnumCheckbox}
                        onChange={handleChangeCheckbox}
                      />
                      {value}
                    </label>
                  ))}
                </Form>
              );
            }}
          </Formik>
        )}
      </div>
      <div className={styles.attributeEnumSection}>
        {children}
      </div>
    </div>
  );
};

AttributeEnum.propTypes = propTypes;
AttributeEnum.defaultProps = defaultProps;

export default AttributeEnum;
