import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { formatNumber } from '@/utils/format';
import { withFormikField } from '@/components/formik';
import Spinner from '@/components/Spinner';
import ErrorMessageBlock from '@/components/ErrorMessageBlock';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import Input from '@/components/Input';
import InputCheckbox from '@/components/InputCheckbox';
import { mapPlatform } from './constants';
import styles from './styles.module.scss';

const propTypes = {
  isSubmitting: PropTypes.bool,
  error: PropTypes.objectOf(PropTypes.any),
  platformId: PropTypes.oneOf(Object.keys(mapPlatform)).isRequired,
  defaultFileName: PropTypes.string,
  statistics: PropTypes.arrayOf(
    PropTypes.shape({
      entityType: PropTypes.oneOf(['EMAIL', 'PHONE']),
      total: PropTypes.number,
    }),
  ),
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
const defaultProps = {
  isSubmitting: false,
  error: null,
  defaultFileName: '',
  statistics: [],
};

const FormikCheckbox = withFormikField(InputCheckbox);
const FormikInput = withFormikField(Input);

const FormModal = function SegmentsExportFilesFormModal({
  isSubmitting,
  error,
  platformId,
  defaultFileName,
  statistics,
  onClose,
  onSubmit,
}) {
  const [shouldSplit, setShouldSplit] = useState(false);
  const handleShouldSplitChange = (_, should) => {
    setShouldSplit(should);
  };
  const [shouldSample, setShouldSample] = useState(false);
  const handleShouldSampleChange = (_, should) => {
    setShouldSample(should);
  };

  const initialFormValues = useMemo(() => ({
    fileName: defaultFileName,
    entityTypes: [],
  }), [defaultFileName]);
  const platform = mapPlatform[platformId];

  const handleModalClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };
  const handleSubmitForm = (values) => {
    if (!isSubmitting) {
      onSubmit(values);
    }
  };

  return (
    <Modal
      title={`Сохранение файлов для «${platform.name}»`}
      preventClose={isSubmitting}
      onClose={handleModalClose}
    >
      <Formik
        initialValues={initialFormValues}
        onSubmit={handleSubmitForm}
      >
        {({ values }) => {
          const { entityTypes } = values;
          const totalStatistics = statistics.reduce((acc, d) => (
            acc + (entityTypes.includes(d.entityType) ? d.total : 0)
          ), 0);
          const hasEntities = Array.isArray(entityTypes)
            && entityTypes.length;
          const canSubmit = hasEntities
            && values.fileName
            && (!shouldSample || values.sampleRowsSize > 0)
            && (!shouldSplit || values.splitFilesCount > 0);

          return (
            <Form className={styles.form}>
              {isSubmitting && (
                <Spinner
                  layout="overlay"
                  className={styles.formSpinner}
                />
              )}

              <div className={styles.formRow}>
                <span className={styles.formLabel}>
                  Название
                </span>
                <span>
                  <Field
                    name="fileName"
                    required
                    component={FormikInput}
                    className={styles.formInput}
                  />
                </span>
              </div>

              <div className={styles.formRow}>
                <span className={styles.formLabel}>
                  Идентификаторы
                </span>
                <span>
                  <Field
                    name="entityTypes"
                    value="PHONE"
                    type="checkbox"
                    required={!hasEntities}
                    component={FormikCheckbox}
                    className={styles.formCheckbox}
                  >
                    Телефоны
                  </Field>
                  <Field
                    name="entityTypes"
                    value="EMAIL"
                    type="checkbox"
                    required={!hasEntities}
                    component={FormikCheckbox}
                    className={styles.formCheckbox}
                  >
                    E-mail
                  </Field>
                </span>
              </div>

              <div className={styles.formRow}>
                <span className={styles.formLabel}>
                  Семплировать
                </span>
                <span>
                  <InputCheckbox
                    checked={shouldSample}
                    onChange={handleShouldSampleChange}
                    className={styles.formCheckbox}
                  >
                    Да
                  </InputCheckbox>
                  <Field
                    name="sampleRowsSize"
                    type="number"
                    min="0"
                    max={totalStatistics || 0}
                    placeholder=""
                    disabled={!shouldSample}
                    required={shouldSample}
                    value={shouldSample ? values.sampleRowsSize : ''}
                    component={FormikInput}
                    className={styles.formInput}
                  />
                  {shouldSample && (
                    <span>
                      идентификаторов из
                      <b>
                        {' '}
                        {formatNumber(totalStatistics || 0)}
                      </b>
                    </span>
                  )}
                </span>
              </div>

              <div className={styles.formRow}>
                <span className={styles.formLabel}>
                  Разбить файл
                </span>
                <span>
                  <InputCheckbox
                    checked={shouldSplit}
                    onChange={handleShouldSplitChange}
                    className={styles.formCheckbox}
                  >
                    Да
                  </InputCheckbox>
                  <Field
                    name="splitFilesCount"
                    type="number"
                    min="0"
                    placeholder=""
                    disabled={!shouldSplit}
                    required={shouldSplit}
                    value={shouldSplit ? values.splitFilesCount : ''}
                    component={FormikInput}
                    className={styles.formInput}
                  />
                  {shouldSplit && 'идентификаторов'}
                </span>
              </div>

              {Boolean(error) && (
                <ErrorMessageBlock
                  error={error}
                  className={styles.formError}
                />
              )}

              <div className={styles.formFooter}>
                <Button
                  appearance="secondary"
                  className={styles.formButton}
                  onClick={handleModalClose}
                >
                  отменить
                </Button>
                <Button
                  type="submit"
                  className={styles.formButton}
                  disabled={!canSubmit}
                >
                  Сохранить
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

FormModal.propTypes = propTypes;
FormModal.defaultProps = defaultProps;

export default FormModal;
