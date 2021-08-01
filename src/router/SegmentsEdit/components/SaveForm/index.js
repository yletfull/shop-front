import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Formik, Form, Field } from 'formik';
import { withFormikField } from '@/components/formik';
import Input from '@/components/Input';
import InputTextarea from '@/components/InputTextarea';
import Button from '@/components/Button';
import ConfirmModal from './ConfirmModal';
import styles from './styles.module.scss';

const propTypes = {
  className: PropTypes.string,
  isSaving: PropTypes.bool,
  onSubmit: PropTypes.func,
};
const defaultProps = {
  className: '',
  isSaving: false,
  onSubmit: () => {},
};

const FormikInput = withFormikField(Input);
const FormikTextarea = withFormikField(InputTextarea);
const initialFormValues = {
  title: '',
  description: '',
};

const SaveForm = function SegmentsSaveForm({
  className,
  isSaving,
  onSubmit,
}) {
  const [isConfirmShown, setIsConfirmShown] = useState(false);
  const [valuesToSave, setValuesToSave] = useState({});
  const handleFormSubmit = (values) => {
    setValuesToSave(values);
    setIsConfirmShown(true);
  };
  const handleSaveConfirm = () => {
    onSubmit(valuesToSave);
  };
  const handleSaveCancel = () => {
    setIsConfirmShown(false);
  };
  const shouldShowConfirm = isSaving || isConfirmShown;

  useEffect(() => {
    if (!isSaving) {
      setIsConfirmShown(false);
      setValuesToSave({});
    }
  }, [isSaving]);

  return (
    <Fragment>
      <Formik
        initialValues={initialFormValues}
        onSubmit={handleFormSubmit}
      >
        {({ values }) => {
          const canSubmit = Boolean(values.title);

          return (
            <Form className={cx(className, styles.wrapper)}>
              <div className={styles.row}>
                <Field
                  name="title"
                  placeholder="Название"
                  required
                  fullwidth
                  component={FormikInput}
                />
              </div>
              <div className={styles.row}>
                <Field
                  name="description"
                  placeholder="Описание (не обязательно)"
                  fullwidth
                  component={FormikTextarea}
                />
              </div>
              <div className={styles.row}>
                <Button
                  type="submit"
                  className={styles.submit}
                  disabled={!canSubmit}
                >
                  Сохранить
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
      {shouldShowConfirm && (
        <ConfirmModal
          isSaving={isSaving}
          onConfirm={handleSaveConfirm}
          onCancel={handleSaveCancel}
        />
      )}
    </Fragment>
  );
};

SaveForm.propTypes = propTypes;
SaveForm.defaultProps = defaultProps;

export default SaveForm;
