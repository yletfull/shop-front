import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { withFormikField } from '@/components/formik';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import IconTimes from '@/icons/TimesLight';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    name: PropTypes.string,
    title: PropTypes.string,
  })),
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  onRemove: PropTypes.func,
  onSubmit: PropTypes.func,
};

const defaultProps = {
  data: [],
  onCancel: () => {},
  onDelete: () => {},
  onRemove: () => {},
  onSubmit: () => {},
};

const EditPermissionsForm = function EditPermissionsForm({
  data,
  onCancel,
  onDelete,
  onRemove,
  onSubmit,
}) {
  const handleClickRemoveButton = (e) => {
    const { value } = e?.target || {};
    onRemove(value);
  };

  const FormikCheckbox = withFormikField(Checkbox);

  return (
    <Formik
      initialValues={{ permissions: data }}
      onSubmit={onSubmit}
    >
      {() => (
        <Form className={styles.editPermissionsForm}>
          {data.length === 0 && (
            <div className={styles.editPermissionsFormEmpty}>
              Нет разрешений
            </div>
          )}

          <div className={styles.editPermissionsFormList}>
            {data.map((d) => (
              <div
                key={d.name || d.id}
                className={styles.editPermissionsFormRow}
              >
                <label className={styles.editPermissionsFormLabel}>
                  <Field
                    name="permissions"
                    value={d.name}
                    component={FormikCheckbox}
                  />
                  {d.title}
                </label>
                <Button
                  appearance="control"
                  className={styles.editPermissionsFormRemove}
                  value={d.name}
                  onClick={handleClickRemoveButton}
                >
                  <IconTimes />
                </Button>
              </div>
            ))}
          </div>
          {data.length > 0 && (
            <div className={styles.editPermissionsFormControls}>
              <Button
                type="submit"
                className={styles.editPermissionsFormButton}
              >
                Сохранить
              </Button>
              <Button
                appearance="secondary"
                className={styles.editPermissionsFormButton}
                onClick={onCancel}
              >
                Отменить
              </Button>
              <Button
                appearance="secondary"
                className={styles.editPermissionsFormButton}
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

EditPermissionsForm.propTypes = propTypes;
EditPermissionsForm.defaultProps = defaultProps;

export default EditPermissionsForm;
