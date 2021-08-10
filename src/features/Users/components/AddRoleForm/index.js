import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';
import Select from '@/components/Select';
import styles from './styles.module.scss';

const propTypes = {
  roles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    title: PropTypes.string,
  })),
  selected: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    title: PropTypes.string,
  })),
  isDisabled: PropTypes.bool,
  onSubmit: PropTypes.func,
};

const defaultProps = {
  roles: [],
  selected: [],
  isDisabled: false,
  onSubmit: () => {},
};

const AddRoleForm = function AddRoleForm({
  roles,
  selected,
  isDisabled,
  onSubmit,
}) {
  const [role, setRole] = useState('');

  const selectedNames = selected
    .map(({ name }) => name);
  const selectOptions = roles
    .filter(({ name }) => Boolean(name)
      && !selectedNames.includes(name))
    .map(({ title, name }) => ({
      text: title,
      value: name,
    }));

  const handleChangeRole = (e) => {
    const { value } = e?.target || {};
    setRole(value);
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const values = Array.from(new FormData(e.target).entries())
      .reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1] }), {});
    onSubmit(values);
  };

  return (
    <form
      className={styles.addRoleForm}
      onSubmit={handleSubmitForm}
    >
      <Select
        name="role"
        value={role}
        options={selectOptions}
        placeholder="Выберите роль"
        disabled={isDisabled}
        onChange={handleChangeRole}
        fullwidth
      />
      <Button
        type="submit"
        className={styles.addRoleFormButton}
        disabled={isDisabled}
      >
        Добавить
      </Button>
    </form>
  );
};

AddRoleForm.propTypes = propTypes;
AddRoleForm.defaultProps = defaultProps;

export default AddRoleForm;
