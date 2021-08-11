import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { withFormikField } from '@/components/formik';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import { mapSections } from '@/features/Roles/constants';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    name: PropTypes.string,
    title: PropTypes.string,
  })),
  selected: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    name: PropTypes.string,
    title: PropTypes.string,
  })),
  onSubmit: PropTypes.func,
};

const defaultProps = {
  data: [],
  selected: [],
  onSubmit: () => {},
};

const AddPermissionsForm = function AddPermissionsForm({
  data,
  selected,
  onSubmit,
}) {
  const selectedPermissions = selected.map(({ name }) => name);
  const permissions = data.reduce((acc, cur) => {
    const section = cur.name.split('.')[0];
    if (!section) {
      return acc;
    }
    return ({
      ...acc,
      [section]: [...(acc[section] || []), cur],
    });
  }, {});

  const handleSubmitForm = (values) => {
    const { permissions: addedPermissions } = values || {};
    if (!addedPermissions) {
      return;
    }
    onSubmit(data.filter((d) => addedPermissions.includes(d.name)));
  };

  const FormikCheckbox = withFormikField(Checkbox);

  return (
    <Formik
      initialValues={{ permissions: [] }}
      onSubmit={handleSubmitForm}
    >
      {() => (
        <Form className={styles.addPermissionsForm}>
          <div className={styles.addPermissionsFormList}>
            {Object.keys(permissions).map((section) => (
              <div
                key={section}
                className={styles.addPermissionsFormSection}
              >
                <span className={styles.addPermissionsFormSectionTitle}>
                  {mapSections[section] || section}
                </span>

                {permissions[section]
                  .filter((d) => !selectedPermissions.includes(d.name))
                  .map((d) => (
                    <label
                      key={d.name || d.id}
                      className={styles.addPermissionsFormLabel}
                    >
                      <Field
                        name="permissions"
                        value={d.name}
                        component={FormikCheckbox}
                      />
                      {d.title}
                    </label>
                  ))}
              </div>
            ))}
          </div>
          <div className={styles.addPermissionsFormControls}>
            <Button
              type="submit"
              className={styles.addPermissionsFormButton}
            >
              Добавить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

AddPermissionsForm.propTypes = propTypes;
AddPermissionsForm.defaultProps = defaultProps;

export default AddPermissionsForm;
