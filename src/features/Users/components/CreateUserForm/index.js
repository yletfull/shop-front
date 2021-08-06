import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from './styles.module.scss';

const propTypes = {
  isDisabled: PropTypes.bool,
  onCancel: PropTypes.func,
  onRemove: PropTypes.func,
  onSubmit: PropTypes.func,
};

const defaultProps = {
  isDisabled: false,
  onCancel: () => {},
  onRemove: () => {},
  onSubmit: () => {},
};

const CreateUserForm = function CreateUserForm({
  isDisabled,
  onCancel,
  onRemove,
  onSubmit,
}) {
  const { id: userId } = useParams();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const values = Array.from(new FormData(e.target).entries())
      .reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1] }), {});
    onSubmit(values);
  };

  return (
    <form
      className={styles.createUserForm}
      onSubmit={handleSubmitForm}
    >
      <label>
        <span className={styles.createUserFormLabel}>
          Логин:
        </span>
        <Input
          name="login"
          placeholder="Логин"
          className={styles.createUserFormInput}
          disabled={isDisabled}
        />
      </label>
      <label>
        <span className={styles.createUserFormLabel}>
          E-mail:
        </span>
        <Input
          name="email"
          placeholder="E-mail"
          className={styles.createUserFormInput}
          disabled={isDisabled}
        />
      </label>
      <label>
        <span className={styles.createUserFormLabel}>
          Телефон:
        </span>
        <Input
          name="phone"
          placeholder="Телефон"
          className={styles.createUserFormInput}
          disabled={isDisabled}
        />
      </label>

      <div className={styles.createUserFormRow}>
        <Button
          type="submit"
          className={styles.createUserFormButton}
          disabled={isDisabled}
        >
          Cоздать
        </Button>
        <Button
          appearance="secondary"
          className={styles.createUserFormButton}
          onClick={onCancel}
        >
          Отмена
        </Button>
        {userId && (
          <Button
            appearance="secondary"
            className={styles.createUserFormButton}
            onClick={onRemove}
          >
            Удалить
          </Button>
        )}
      </div>
    </form>
  );
};

CreateUserForm.propTypes = propTypes;
CreateUserForm.defaultProps = defaultProps;

export default CreateUserForm;
