import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { withFormikField } from '@/components/formik';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Input from '@/components/Input';
import styles from './styles.module.scss';

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

const defaultProps = {
  name: '',
  onClose: () => {},
  onSubmit: () => {},
};

const DownloadFilesForm = function DownloadFilesForm({
  id,
  name,
  onClose,
  onSubmit,
}) {
  const sources = {
    phones: 'PHONE',
    emails: 'EMAIL',
  };

  const initialFormValues = {
    id,
    name,
    sources: [],
    samples: 0,
    count: 0,
  };

  const [isSetCount, setIsSetCount] = useState(false);
  const [isSetSample, setIsSetSample] = useState(false);

  const handleClickCancelButton = () => {
    onClose();
  };
  const handleClickSetCount = (e) => {
    const { checked } = e?.target || {};
    setIsSetCount(checked);
  };
  const handleClickSetSample = (e) => {
    const { checked } = e?.target || {};
    setIsSetSample(checked);
  };
  const handleSubmitForm = (values) => {
    onSubmit(values);
  };

  const FormikCheckbox = withFormikField(Checkbox);
  const FormikInput = withFormikField(Input);

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={handleSubmitForm}
    >
      {({ values }) => {
        console.log(values);
        return (
          <Form className={styles.downloadFilesForm}>
            <div>
              <span>
                Название
              </span>
              <span>
                <Field
                  name="name"
                  component={FormikInput}
                />
              </span>
            </div>

            <div>
              <span>
                Идентификаторы
              </span>
              <span>
                <label>
                  <Field
                    name="sources"
                    value={sources.phones}
                    component={FormikCheckbox}
                  />
                  Телефоны
                </label>
                <label>
                  <Field
                    name="sources"
                    value={sources.emails}
                    component={FormikCheckbox}
                  />
                  E-mail
                </label>
              </span>
            </div>

            <div>
              <span>
                Семплировать
              </span>
              <span>
                <label>
                  <Checkbox
                    onClick={handleClickSetSample}
                  />
                  Да
                </label>
                <Field
                  name="samples"
                  type="number"
                  min="0"
                  disabled={!isSetSample}
                  component={FormikInput}
                />
                идентификаторов из
              </span>
            </div>

            <div>
              <span>
                Разбить файл
              </span>
              <span>
                <label>
                  <Checkbox
                    onClick={handleClickSetCount}
                  />
                  Да
                </label>
                <Field
                  name="count"
                  type="number"
                  min="0"
                  disabled={!isSetCount}
                  component={FormikInput}
                />
                частей
              </span>
            </div>

            <div>
              <Button
                appearance="secondary"
                onClick={handleClickCancelButton}
              >
                отменить
              </Button>
              <Button type="submit">
                сохранить
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

DownloadFilesForm.propTypes = propTypes;
DownloadFilesForm.defaultProps = defaultProps;

export default DownloadFilesForm;
