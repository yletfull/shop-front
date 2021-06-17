import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { withFormikField } from '@/components/formik';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Input from '@/components/Input';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    group: PropTypes.string,
    attributes: PropTypes.arrayOf(PropTypes.shape({
      attributeName: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string),
      title: PropTypes.string,
      type: PropTypes.string,
    })),
  })),
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

const defaultProps = {
  data: [],
  onCancel: () => {},
  onSubmit: () => {},
};

const ParamsForm = function ParamsForm({
  data,
  onCancel,
  onSubmit,
}) {
  const initialFormValues = {
    all: false,
    search: '',
    params: [],
  };

  const filterParamsOptions = (search) => {
    if (typeof search === 'undefined') {
      return data;
    }
    const filterAttributes = (attribute) => {
      const searched = attribute.title || attribute.attributeName;
      if (!searched) {
        return false;
      }
      return searched.includes(search);
    };
    const reduceGroups = (acc, { group, attributes }) => {
      if (!attributes && !Array.isArray(attributes)) {
        return acc;
      }
      const filteredAttributes = attributes.filter(filterAttributes);
      if (filteredAttributes.length === 0) {
        return acc;
      }
      return [...acc, { group, attributes: filteredAttributes }];
    };
    return data.reduce(reduceGroups, []);
  };
  const handleClickCancelButton = () => {
    onCancel();
  };
  const handleSubmitForm = (values) => {
    const { params } = values || {};
    if (!params) {
      return;
    }
    const reduceAttributeGroups = (acc, group) => ([
      ...acc,
      ...group?.attributes || [],
    ]);
    const filterAttributes = ({ id }) => id && params.includes(String(id));
    const selectedAttributes = data
      .reduce(reduceAttributeGroups, [])
      .filter(filterAttributes);
    onSubmit(selectedAttributes);
  };

  const FormikCheckbox = withFormikField(Checkbox);
  const FormikInput = withFormikField(Input);

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={handleSubmitForm}
    >
      {({ values }) => {
        const { search } = values || {};
        const options = filterParamsOptions(search);
        return (
          <Form>
            <div className={styles.paramsHeader}>
              <Field
                name="search"
                placeholder="Найти"
                component={FormikInput}
                fullwidth
              />
            </div>

            <div className={styles.paramsMain}>
              {options.map(({ group, attributes }) => (
                <div
                  key={group}
                  className={styles.paramsSection}
                >
                  <span className={styles.paramsSectionName}>
                    {group}
                  </span>
                  {attributes.map((attribute) => (
                    <label
                      key={attribute.id}
                      className={styles.paramsSectionLabel}
                    >
                      <Field
                        component={FormikCheckbox}
                        name="params"
                        value={attribute.id}
                      />
                      {attribute.title || attribute.attributeName}
                    </label>
                  ))}
                </div>
              ))}
            </div>

            <div className={styles.paramsFooter}>
              <div className={styles.paramsFooterSection}>
                <span className={styles.paramsFooterLabel}>
                  Выбрано:
                  <span className={styles.paramsFooterCount}>
                    {values?.params?.length || 0}
                  </span>
                </span>
              </div>
              <div className={styles.paramsFooterSection}>
                <Button
                  appearance="secondary"
                  className={styles.paramsFooterButton}
                  onClick={handleClickCancelButton}
                >
                  отменить
                </Button>
                <Button
                  type="submit"
                  className={styles.paramsFooterButton}
                >
                  добавить
                </Button>
              </div>
              <div className={styles.paramsFooterSection} />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

ParamsForm.propTypes = propTypes;
ParamsForm.defaultProps = defaultProps;

export default ParamsForm;
