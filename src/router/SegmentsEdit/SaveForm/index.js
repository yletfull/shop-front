import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from './styles.module.scss';

const propTypes = {
  onSubmit: PropTypes.func,
};

const defaultProps = {
  onSubmit: () => {},
};

const SaveForm = function SaveForm({ onSubmit }) {
  const [fileName, setFileName] = useState('');

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
        onChange={handleChangeFileName}
        fullwidth
      />
      <Button
        className={styles.saveFormButton}
        appearance="control"
        type="submit"
      >
        сохранить
      </Button>
    </form>
  );
};

SaveForm.propTypes = propTypes;
SaveForm.defaultProps = defaultProps;

export default SaveForm;
