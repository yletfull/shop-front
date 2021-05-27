import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Form, Field } from 'react-final-form';
import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.objectOf(PropTypes.string),
  onSubmit: PropTypes.func,
};
const defaultProps = {
  data: {},
  onSubmit: () => {},
};

const ParamsForm = function ParamsForm({ data, onSubmit }) {
  const handleSubmitParams = (formValues) => {
    onSubmit(formValues);
  };

  return (
    <Form onSubmit={handleSubmitParams}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className={styles.paramsHeader}>
            <Field name="search">
              {({ input }) => (
                <Input
                  name={input.name}
                  value={input.value}
                  onChange={input.onChange}
                  placeholder="Найти"
                  fullwidth
                />
              )}
            </Field>
            <label
              className={cx(
                styles.paramsLabel,
                styles.paramsLabelSelectAll,
              )}
            >
              <Field
                name="all"
                component="input"
                type="checkbox"
              />
              Выбрать все
            </label>
          </div>
          <div className={styles.paramsMain}>
            {Object.keys(data)
              .map((section) => (
                <div
                  key={section}
                  className={styles.paramsSection}
                >
                  <span className={styles.paramsSectionName}>
                    {section}
                  </span>
                  {data[section].map((sectionParam) => (
                    <label key={sectionParam.value}>
                      <Field
                        name="params"
                        component="input"
                        type="checkbox"
                        value={sectionParam.value}
                      />
                      {sectionParam.label}
                    </label>
                  ))}
                </div>
              ))}
          </div>
          <div className={styles.paramsFooter}>
            <Button
              type="submit"
            >
              Выбрать
            </Button>
          </div>
        </form>
      )}
    </Form>
  );
};

ParamsForm.propTypes = propTypes;
ParamsForm.defaultProps = defaultProps;

export default ParamsForm;
