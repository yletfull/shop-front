import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.shape({
    login: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }),
  isDisabled: PropTypes.bool,
  onCancel: PropTypes.func,
  onRemove: PropTypes.func,
  onSubmit: PropTypes.func,
};

const defaultProps = {
  data: {},
  isDisabled: false,
  onCancel: () => {},
  onRemove: () => {},
  onSubmit: () => {},
};

const EditUserForm = function EditUserForm({
  data,
  isDisabled,
  onCancel,
  onRemove,
  onSubmit,
}) {
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const values = Array.from(new FormData(e.target).entries())
      .reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1] }), {});
    onSubmit(values);
  };

  return (
    <form
      className={styles.editUserForm}
      onSubmit={handleSubmitForm}
    >
      <label>
        <span className={styles.editUserFormLabel}>
          Логин:
        </span>
        <Input
          name="login"
          defaultValue={data.login || ''}
          className={styles.editUserFormInput}
          disabled
        />
      </label>
      <label>
        <span className={styles.editUserFormLabel}>
          E-mail:
        </span>
        <Input
          name="email"
          placeholder="E-mail"
          defaultValue={data.email || ''}
          className={styles.editUserFormInput}
          disabled={isDisabled}
        />
      </label>
      <label>
        <span className={styles.editUserFormLabel}>
          Телефон:
        </span>
        <Input
          name="phone"
          placeholder="Телефон"
          defaultValue={data.phone || ''}
          className={styles.editUserFormInput}
          disabled={isDisabled}
        />
      </label>
      <label>
        <span className={styles.editUserFormLabel}>
          Пароль:
        </span>
        <Input
          name="password"
          placeholder="Пароль"
          className={styles.editUserFormInput}
          disabled={isDisabled}
        />
      </label>

      <div className={styles.editUserFormRow}>
        <Button
          type="submit"
          className={styles.editUserFormButton}
          disabled={isDisabled}
        >
          Сохранить
        </Button>
        <Button
          appearance="secondary"
          className={styles.editUserFormButton}
          onClick={onCancel}
        >
          Отмена
        </Button>
        <Button
          appearance="secondary"
          data-type="remove"
          className={styles.editUserFormButton}
          onClick={onRemove}
        >
          Удалить
        </Button>
      </div>
    </form>
  );
};

EditUserForm.propTypes = propTypes;
EditUserForm.defaultProps = defaultProps;

export default EditUserForm;
