import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { withFormikField } from '@/components/formik';
import Button from '@/components/Button';
import Input from '@/components/Input';
import IconTimes from '@/icons/TimesLight';
import styles from './styles.module.scss';

const propTypes = {
  permissions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    name: PropTypes.string,
    title: PropTypes.string,
  })),
  title: PropTypes.string,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  onRemove: PropTypes.func,
  onSubmit: PropTypes.func,
};

const defaultProps = {
  permissions: [],
  title: '',
  onCancel: () => {},
  onDelete: () => {},
  onRemove: () => {},
  onSubmit: () => {},
};

const EditRoleForm = function EditRoleForm({
  permissions,
  title,
  onCancel,
  onDelete,
  onRemove,
  onSubmit,
}) {
  const handleClickRemoveButton = (e) => {
    const { value } = e?.target || {};
    onRemove(value);
  };

  const FormikInput = withFormikField(Input);

  return (
    <Formik
      initialValues={{ title, permissions }}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {() => (
        <Form className={styles.editRoleForm}>
          <Field
            name="title"
            component={FormikInput}
            className={styles.editRoleFormInput}
            fullwidth
          />

          {permissions.length === 0 && (
            <div className={styles.editRoleFormEmpty}>
              Нет разрешений
            </div>
          )}

          <div className={styles.editRoleFormList}>
            {permissions.map((d, index) => (
              <div
                key={d.name || d.id}
                className={styles.editRoleFormRow}
              >
                <span className={styles.editRoleFormLabel}>
                  {`${index + 1}. `}
                  {d.title}
                </span>
                <Button
                  appearance="control"
                  className={styles.editRoleFormRemove}
                  value={d.name}
                  onClick={handleClickRemoveButton}
                >
                  <IconTimes />
                </Button>
              </div>
            ))}
          </div>
          {permissions.length > 0 && (
            <div className={styles.editRoleFormControls}>
              <Button
                type="submit"
                className={styles.editRoleFormButton}
              >
                Сохранить
              </Button>
              <Button
                appearance="secondary"
                className={styles.editRoleFormButton}
                onClick={onCancel}
              >
                Отменить
              </Button>
              <Button
                appearance="secondary"
                className={styles.editRoleFormButton}
                onClick={onDelete}
              >
                Удалить
              </Button>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

EditRoleForm.propTypes = propTypes;
EditRoleForm.defaultProps = defaultProps;

export default EditRoleForm;
