import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { withFormikField } from '@/components/formik';
import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  isDisabled: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

const defaultProps = {
  children: null,
  isDisabled: false,
  onCancel: () => {},
  onSubmit: () => {},
};

const CreateRoleForm = function CreateRoleForm({
  children,
  isDisabled,
  onCancel,
  onSubmit,
}) {
  const FormikInput = withFormikField(Input);
  return (
    <Formik
      initialValues={{ name: '', title: '' }}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Form className={styles.createRoleForm}>
          <div className={styles.createRoleFormRow}>
            <label
              htmlFor="name"
              className={styles.createRoleFormLabel}
            >
              Имя*
            </label>
            <Field
              id="name"
              name="name"
              component={FormikInput}
              disabled={isDisabled}
              fullwidth
            />
          </div>
          <div className={styles.createRoleFormRow}>
            <label
              htmlFor="title"
              className={styles.createRoleFormLabel}
            >
              Название
            </label>
            <Field
              id="title"
              name="title"
              component={FormikInput}
              disabled={isDisabled}
              fullwidth
            />
          </div>
          <div className={styles.createRoleFormRow}>
            {children}
          </div>
          <div className={styles.createRoleFormRow}>
            <Button
              type="submit"
              className={styles.createRoleFormButton}
              disabled={isDisabled || values.name.length === 0}
            >
              Сохранить
            </Button>
            <Button
              appearance="secondary"
              data-action="cancel"
              className={styles.createRoleFormButton}
              onClick={onCancel}
            >
              Отменить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

CreateRoleForm.propTypes = propTypes;
CreateRoleForm.defaultProps = defaultProps;

export default CreateRoleForm;
