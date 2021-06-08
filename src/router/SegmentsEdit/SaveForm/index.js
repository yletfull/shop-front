import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from './styles.module.scss';

const propTypes = {
  isFetching: PropTypes.bool,
  name: PropTypes.string,
  onSubmit: PropTypes.func,
};

const defaultProps = {
  isFetching: false,
  name: '',
  onSubmit: () => {},
};

const SaveForm = function SaveForm({
  isFetching,
  name,
  onSubmit,
}) {
  const [fileName, setFileName] = useState(name);

  useEffect(() => {
    setFileName(name);
  }, [name]);

  const handleChangeFileName = (e) => {
    const { value } = e?.target || {};
    if (typeof value === 'undefined') {
      return;
    }
    setFileName(value);
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    onSubmit({ fileName });
  };

  return (
    <form
      className={styles.saveForm}
      onSubmit={handleSubmitForm}
    >
      <Input
        name="segmentName"
        className={styles.saveFormInput}
        placeholder="Укажите название"
        value={fileName}
        disabled={isFetching}
        onChange={handleChangeFileName}
        fullwidth
      />
      <Button
        className={styles.saveFormButton}
        appearance="control"
        type="submit"
        disabled={isFetching}
      >
        сохранить
      </Button>
    </form>
  );
};

SaveForm.propTypes = propTypes;
SaveForm.defaultProps = defaultProps;

export default SaveForm;
