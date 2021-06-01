import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormSpy, Field } from 'react-final-form';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
  })),
  name: PropTypes.string,
  selected: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};

const defaultProps = {
  data: [],
  name: 'options',
  selected: [],
  onChange: () => {},
};

const AttributeOptions = function AttributeOptions({
  data,
  name,
  selected,
  onChange,
}) {
  const handleChangeFormFields = ({ values }) => {
    if (values && values[name]) {
      onChange(values[name]);
    }
  };
  const handleSubmitForm = () => {};

  return (
    <div className={styles.attributeOptions}>
      <Form onSubmit={handleSubmitForm}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {data.map(({ value }) => (
              <label
                key={value}
                className={styles.attributeOptionsLabel}
              >
                <Field
                  key={value}
                  value={value}
                  name={name}
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
    </div>
  );
};

AttributeOptions.propTypes = propTypes;
AttributeOptions.defaultProps = defaultProps;

export default AttributeOptions;
