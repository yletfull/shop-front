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

const UserForm = function UserForm({
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
      className={styles.userForm}
      onSubmit={handleSubmitForm}
    >
      <label>
        <span className={styles.userFormLabel}>
          Логин:
        </span>
        <Input
          name="login"
          placeholder="Логин"
          className={styles.userFormInput}
          disabled={isDisabled}
        />
      </label>
      <label>
        <span className={styles.userFormLabel}>
          E-mail:
        </span>
        <Input
          name="email"
          placeholder="E-mail"
          className={styles.userFormInput}
          disabled={isDisabled}
        />
      </label>
      <label>
        <span className={styles.userFormLabel}>
          Телефон:
        </span>
        <Input
          name="phone"
          placeholder="Телефон"
          className={styles.userFormInput}
          disabled={isDisabled}
        />
      </label>

      <div className={styles.userFormRow}>
        <Button
          type="submit"
          className={styles.userFormButton}
          disabled={isDisabled}
        >
          Cоздать
        </Button>
        <Button
          appearance="secondary"
          className={styles.userFormButton}
          onClick={onCancel}
        >
          Отмена
        </Button>
        {userId && (
          <Button
            appearance="secondary"
            className={styles.userFormButton}
            onClick={onRemove}
          >
            Удалить
          </Button>
        )}
      </div>
    </form>
  );
};

UserForm.propTypes = propTypes;
UserForm.defaultProps = defaultProps;

export default UserForm;
