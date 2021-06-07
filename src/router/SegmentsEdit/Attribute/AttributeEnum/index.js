import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormSpy, Field } from 'react-final-form';
import cx from 'classnames';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  data: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
    })),
  }),
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
  onChange,
}) {
  const { options } = data || {};

  const isVisibleOptions = options && Array.isArray(options);

  const selected = isVisibleOptions
    ? options.map(({ value }) => value)
    : [];

  const handleChangeFormFields = ({ values }) => {
    if (values && values.options) {
      onChange('options', values.options);
    }
  };
  const handleSubmitForm = () => {};

  return (
    <div className={styles.attributeEnum}>
      <div
        className={cx(
          styles.attributeEnumSection,
          styles.attributeEnumSection_form,
        )}
      >
        {isVisibleOptions && (
          <Form onSubmit={handleSubmitForm}>
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                {options.map(({ value }) => (
                  <label
                    key={value}
                    className={styles.attributeEnumOption}
                  >
                    <Field
                      key={value}
                      value={value}
                      name="options"
                      component="input"
                      type="checkbox"
                      checked={selected.includes(value)}
                    />
                    {value}
                  </label>
                ))}
                <FormSpy onChange={handleChangeFormFields} />
              </form>
            )}
          </Form>
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
