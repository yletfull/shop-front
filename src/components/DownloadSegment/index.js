import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@/components/Checkbox';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Spinner from '@/components/Spinner';
import { entityTypes } from './constants';
import { getDownloadLink } from './service';
import styles from './styles.module.scss';

const propTypes = {
  by: PropTypes.oneOf(['id', 'meta']),
  id: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

const defaultProps = {
  by: 'id',
  id: '',
  title: '',
  onClose: () => {},
};

const DownloadSegment = function DownloadSegment({
  by,
  id,
  title,
  type,
  onClose,
}) {
  const [error] = useState(null);
  const [isRequested] = useState(false);

  const [isSetCount, setIsSetCount] = useState(false);
  const [isSetSample, setIsSetSample] = useState(false);

  const [values, setValues] = useState({
    name: title || '',
    entityTypes: [],
    samples: 0,
    count: 0,
  });

  if (!id) {
    return null;
  }

  const handleChangeInput = (e) => {
    const { name, value } = e?.target || {};
    if (!name) {
      return;
    }
    setValues({ ...values, [name]: value });
  };
  const handleClickSetCount = (e) => {
    const { checked } = e?.target || {};
    setIsSetCount(checked);
  };
  const handleClickSetSample = (e) => {
    const { checked } = e?.target || {};
    setIsSetSample(checked);
  };
  const handleSubmitForm = (formValues) => {
    console.log(formValues);
  };

  return (
    <div className={styles.downloadSegment}>
      <Modal
        header={(
          <span>
            Сохранение файлов
            {type ? ` для ${type.toUpperCase()}` : ''}
          </span>
        )}
        isVisible={Boolean(id)}
        onClose={onClose}
      >
        <form onSubmit={handleSubmitForm}>
          <div className={styles.downloadFormRow}>
            <span className={styles.downloadFormLabel}>
              Название
            </span>
            <span>
              <Input
                name="name"
                className={styles.downloadFormInput}
                value={values.name}
                disabled={isRequested}
                onChange={handleChangeInput}
              />
            </span>
          </div>

          <div className={styles.downloadFormRow}>
            <span className={styles.downloadFormLabel}>
              Идентификаторы
            </span>
            <span>
              <label className={styles.downloadFormCheckbox}>
                <Checkbox
                  name="entityTypes"
                  value={entityTypes.phones}
                  checked={values.entityTypes.includes(entityTypes.phones)}
                  disabled={isRequested}
                />
                Телефоны
              </label>
              <label className={styles.downloadFormCheckbox}>
                <Checkbox
                  name="entityTypes"
                  value={entityTypes.emails}
                  checked={values.entityTypes.includes(entityTypes.emails)}
                  disabled={isRequested}
                />
                E-mail
              </label>
            </span>
          </div>

          <div className={styles.downloadFormRow}>
            <span className={styles.downloadFormLabel}>
              Семплировать
            </span>
            <span>
              <label className={styles.downloadFormCheckbox}>
                <Checkbox
                  onClick={handleClickSetSample}
                  disabled={isRequested}
                />
                Да
              </label>
              <Input
                name="samples"
                type="number"
                min="0"
                disabled={!isSetSample || isRequested}
                value={values.samples}
                className={styles.downloadFormInput}
                onChange={handleChangeInput}
              />
              идентификаторов из
            </span>
          </div>

          <div className={styles.downloadFormRow}>
            <span className={styles.downloadFormLabel}>
              Разбить файл
            </span>
            <span>
              <label className={styles.downloadFormCheckbox}>
                <Checkbox
                  disabled={isRequested}
                  onClick={handleClickSetCount}
                />
                Да
              </label>
              <Input
                name="count"
                type="number"
                min="0"
                disabled={!isSetCount || isRequested}
                value={values.count}
                className={styles.downloadFormInput}
                onChange={handleChangeInput}
              />
              частей
            </span>
          </div>

          <div className={styles.downloadFormRow}>
            <Button
              appearance="secondary"
              className={styles.downloadFormButton}
              disabled={isRequested}
              onClick={onClose}
            >
              отменить
            </Button>

            {by === 'id'
              ? (
                <a
                  href={getDownloadLink({
                    id,
                    filename: values.name,
                    entityTypes: values.entityTypes.join(),
                    adsPlatform: type,
                    sampleRowsSize: values.samples,
                    splitFilesCount: values.count,
                  })}
                  className={styles.downloadFormLink}
                >
                  {isRequested
                    ? (<Spinner />)
                    : 'сохранить'}
                </a>
              )
              : (
                <Button
                  type="submit"
                  className={styles.downloadFormButton}
                  disabled={isRequested}
                >
                  {isRequested
                    ? (<Spinner />)
                    : 'сохранить'}
                </Button>
              )}
          </div>
        </form>
        {error && (
          <span className={styles.downloadSegmentError}>
            При экспорте файла возникла ошибка
            {error.status && (
              ` (код ошибки: ${error.status})`
            )}
          </span>
        )}
      </Modal>
    </div>
  );
};

DownloadSegment.propTypes = propTypes;
DownloadSegment.defaultProps = defaultProps;

export default DownloadSegment;
